import { useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./Form/Input";
import SelectInput from "./Form/SelectInput";
import SwitchToggle from "./Form/ToggleInput";
import {
  APARTMENT_TYPES,
  PER_SQ_FT_COST,
  COMMON_OPTIONS,
  validateNumeric,
  validateFloat,
  validateMax,
} from "@/constant";

const initialValues = {
  projectLocation: "",
  projectName: "",
  totalProjectArea: "",
  numberOfTowers: "",
  numberOfFloors: "",
  totalBuiltUpArea: "",
  numberOfUnits: "",
  numberOfUnitsPerFloor: "",
  apartmentTypes: [],
  totalCarpetArea: "",
  isGroundFloorParkingOnly: "",
};

const CalculationForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialValues,
  });
  const [propertyCalculation, setPropertyCalculation] = useState(null);

  const onSubmit = (data) => {
    const { totalBuiltUpArea, numberOfFloors, numberOfTowers } = data;
    const totalAreaPerTower = totalBuiltUpArea * numberOfFloors;
    const costPerTower = PER_SQ_FT_COST * totalAreaPerTower;
    const calculatedTotalCost = costPerTower * numberOfTowers;
    setPropertyCalculation({
      costPerTower,
      totalAreaPerTower,
      totalCostWithoutConversion: calculatedTotalCost,
      totalCost: (calculatedTotalCost / 1e6).toFixed(2),
    });
  };

  const handleReset = () => {
    reset(initialValues);
    setPropertyCalculation(null);
  };

  return (
    <div className="p-8 space-y-4">
    <form onSubmit={handleSubmit(onSubmit)} >
      <div className="grid grid-cols-2 gap-4">
      <Input
        label="Project Name"
        name="projectName"
        register={register}
        required
        error={errors?.projectName?.message}
        maxLength={20}
      />
      <Input
        label="Project Location"
        name="projectLocation"
        register={register}
      />
      
      <Input
        label="Total Project Area (Sqft)"
        name="totalProjectArea"
        register={register}
        maxLength={12}
        validation={{
          ...validateFloat(),
        }}
        error={errors?.totalProjectArea?.message}
      />
      <Input
        label="Number of Towers"
        name="numberOfTowers"
        register={register}
        required
        maxLength={12}
        error={errors?.numberOfTowers?.message}
        validation={{
          ...validateNumeric(),
        }}
      />
      <Input
        label="Total Built Up Area of each Tower (Sqft)"
        name="totalBuiltUpArea"
        register={register}
        required
        maxLength={16}
        validation={{
          ...validateFloat(),
        }}
        error={errors?.totalBuiltUpArea?.message}
      />
      <Input
        label="Number of Floors in Tower"
        name="numberOfFloors"
        register={register}
        required
        maxLength={12}
        validation={{
          ...validateNumeric(),
        }}
        error={errors?.numberOfFloors?.message}
      />
      <Input
        label="Number of Units in Tower"
        name="numberOfUnits"
        register={register}
        maxLength={12}
        validation={{
          ...validateNumeric(),
        }}
        error={errors?.numberOfUnits?.message}
      />
      <Input
        label="Number of Units on each floor"
        name="numberOfUnitsPerFloor"
        register={register}
        maxLength={12}
        validation={{
          ...validateNumeric(),
        }}
        error={errors?.numberOfUnitsPerFloor?.message}
      />
      {/*<SelectInput
        label="Type of Apartment on each floor"
        name="apartmentTypes"
        control={control}
        options={APARTMENT_TYPES}
        isMulti
      />*/}
      <Input
        label="Total Carpet Area of each floor (Sqft)"
        name="totalCarpetArea"
        register={register}
        maxLength={16}
        validation={{
          ...validateFloat(),
        }}
        error={errors?.totalCarpetArea?.message}
      />
      <SwitchToggle
        label="Is ground floor dedicated to Parking only?"
        name="isGroundFloorParkingOnly"
        control={control}
        error={errors?.isGroundFloorParkingOnly?.message}
      />
      </div>
      <div class="border border-indigo-600 mb-8 mt-4"></div>
      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded"
        >
          Calculate Cost
        </button>
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      {propertyCalculation && (
        <div className="mt-6 border p-4">
          <h2 className="text-xl font-bold border-b pb-2">Calculation Results</h2>
          <ul className="grid grid-cols-1 divide-y">
            <li className="py-2">
              Total construction cost for each Tower:
              <strong> ${propertyCalculation.costPerTower}</strong>
            </li>
            <li className="py-2">
              Total Area Per Tower: {" "}<strong>{propertyCalculation.totalAreaPerTower} Sqft </strong>
            </li>
            <li className="py-2">
              Total construction cost for project:
              <strong> ${propertyCalculation.totalCostWithoutConversion} </strong>
            </li>
            <li className="py-2 background bg-slate-100 p-2 text-sm">
              <strong>
                Total project cost would be ${propertyCalculation.totalCost}M
                USD
              </strong>
            </li>
          </ul>
        </div>
      )}
    </form>
    </div>
  );
};

export default CalculationForm;
