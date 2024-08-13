import { useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./Form/Input";
import SelectInput from "./Form/SelectInput";
import {
  APARTMENT_TYPES,
  PER_SQ_FT_COST,
  COMMON_OPTIONS,
  validateNumeric,
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
  const [totalCost, setTotalCost] = useState(null);

  const onSubmit = (data) => {
    const { totalBuiltUpArea, numberOfFloors, numberOfTowers } = data;
    const totalAreaPerTower = totalBuiltUpArea * numberOfFloors;
    const costPerTower = PER_SQ_FT_COST * totalAreaPerTower;
    const calculatedTotalCost = costPerTower * numberOfTowers;
    setTotalCost((calculatedTotalCost / 1e6).toFixed(2));
  };

  const handleReset = () => {
    reset(initialValues);
    setTotalCost(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-4">
      <Input label="Project Name" name="projectName" register={register} />
      <Input
        label="Project Location"
        name="projectLocation"
        register={register}
      />
      <Input
        label="Total Project Area (Sqft)"
        name="totalProjectArea"
        register={register}
        validation={{
          ...validateNumeric(),
        }}
        error={errors?.totalProjectArea?.message}
      />
      <Input
        label="Number of Towers"
        name="numberOfTowers"
        register={register}
        required
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
        validation={{
          ...validateNumeric(),
        }}
        error={errors?.totalBuiltUpArea?.message}
      />
      <Input
        label="Number of Floors in Tower"
        name="numberOfFloors"
        register={register}
        required
        validation={{
          ...validateNumeric(),
        }}
        error={errors?.numberOfFloors?.message}
      />
      <Input
        label="Number of Units in Tower"
        name="numberOfUnits"
        register={register}
        validation={{
          ...validateNumeric(),
        }}
        error={errors?.numberOfUnits?.message}
      />
      <Input
        label="Number of Units on each floor"
        name="numberOfUnitsPerFloor"
        register={register}
        validation={{
          ...validateNumeric(),
        }}
        error={errors?.numberOfUnitsPerFloor?.message}
      />
      <SelectInput
        label="Type of Apartment on each floor"
        name="apartmentTypes"
        control={control}
        options={APARTMENT_TYPES}
        isMulti
      />
      <Input
        label="Total Carpet Area of each floor (Sqft)"
        name="totalCarpetArea"
        register={register}
        validation={{
          ...validateNumeric(),
        }}
        error={errors?.totalCarpetArea?.message}
      />
      <SelectInput
        label="Is ground floor dedicated to Parking only?"
        name="isGroundFloorParkingOnly"
        control={control}
        options={COMMON_OPTIONS}
      />
      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
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
      {totalCost && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">
            Total Project Cost: ${totalCost}M USD
          </h2>
        </div>
      )}
    </form>
  );
};

export default CalculationForm;
