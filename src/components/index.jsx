import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import Input from "./Form/Input";
import SwitchToggle from "./Form/ToggleInput";
import UnitToggle from "./Form/UnitToggle";
import LocationAutocomplete from "./Form/LocationAutocomplete";
import { PER_SQ_FT_COST, validateNumeric, validateFloat } from "@/constant";
import { motion } from "framer-motion";

const initialValues = {
  projectLocation: "",
  projectName: "",
  totalProjectArea: "",
  numberOfTowers: "",
  numberOfFloors: "",
  totalBuiltUpArea: "",
  numberOfUnits: "",
  numberOfUnitsPerFloor: [],
  totalCarpetArea: "",
  isGroundFloorParkingOnly: false,
};

const CalculationForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    trigger,
    setValue,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: initialValues,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "numberOfUnitsPerFloor",
  });

  const [propertyCalculation, setPropertyCalculation] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  const numberOfFloors = watch("numberOfFloors");
  const numberOfUnits = watch("numberOfUnits");

  useEffect(() => {
    if (currentStep === 3) {
      const unitsPerFloor = numberOfUnits / numberOfFloors;
      remove();
      for (let i = 0; i < numberOfFloors; i++) {
        append({ value: unitsPerFloor });
      }
    }
  }, [currentStep, numberOfFloors, numberOfUnits, append, remove]);

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

  const handleNextStep = async () => {
    const isStepValid = await trigger(
      currentStep === 1
        ? ["projectName", "projectLocation"]
        : [
            "numberOfTowers",
            "totalBuiltUpArea",
            "numberOfFloors",
            "numberOfUnits",
          ]
    );

    if (isStepValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePreviousStep = () => setCurrentStep((prev) => prev - 1);

  const recalculateUnits = (index, newValue) => {
    if (newValue < 0) return;

    const totalUnits = numberOfUnits;

    const updatedFields = fields
      .map((field, i) => (i === index ? { ...field, value: newValue } : field))
      .map((field) => ({
        ...field,
        value: field.value === -1 ? 0 : field.value,
      }));

    const totalCurrentUnits = updatedFields.reduce(
      (sum, field) => sum + field.value,
      0
    );

    const adjustment = totalCurrentUnits - totalUnits;
    if (adjustment !== 0) {
      const adjustIndex =
        index === updatedFields.length - 1 ? 0 : updatedFields.length - 1;
      updatedFields[adjustIndex].value -= adjustment;
    }

    if (
      updatedFields.some((field) => field.value < 0 || field.value > totalUnits)
    ) {
      setError(`numberOfUnitsPerFloor.${index}.value`, {
        type: "custom",
        message:
          "Total accumulated units for each floor cannot be more than number of units in tower",
      });
      return;
    }

    update(updatedFields);
    updatedFields.forEach((field, i) => {
      setValue(`numberOfUnitsPerFloor.${i}.value`, field.value);
      clearErrors(`numberOfUnitsPerFloor.${i}.value`);
    });
  };

  const handleFieldChange = (index) => (newValue) => {
    recalculateUnits(index, newValue);
  };

  const handleReset = () => {
    reset(initialValues);
    setPropertyCalculation(null);
    setCurrentStep(1);
    remove();
  };

  return (
    <div className="p-8 space-y-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border-b border-indigo-600 mb-8">
          <div className="text-lg font-medium text-indigo-600">
            Step {currentStep} of 3
          </div>
          <motion.div
            className="h-1 bg-indigo-600 mt-2 rounded-full"
            initial={{ width: "33%" }}
            animate={{ width: `${(currentStep / 3) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Input
              label="Project Name"
              name="projectName"
              register={register}
              required
              error={errors?.projectName?.message}
              maxLength={20}
            />
            <Controller
              name="projectLocation"
              control={control}
              render={({ field }) => (
                <LocationAutocomplete
                  value={field.value}
                  onChange={field.onChange}
                  label="Project Location"
                  onSelect={(location) => {
                    field.onChange(location.display_name);
                  }}
                />
              )}
            />
            <Input
              label="Total Project Area (Sqft)"
              name="totalProjectArea"
              register={register}
              maxLength={12}
              validation={{ ...validateFloat() }}
              error={errors?.totalProjectArea?.message}
            />
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                type="button"
                className="bg-indigo-500 text-white px-4 py-2 rounded"
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Number of Towers"
                name="numberOfTowers"
                register={register}
                required
                maxLength={12}
                validation={{ ...validateNumeric() }}
                error={errors?.numberOfTowers?.message}
              />
              <Input
                label="Total Built Up Area of each Tower (Sqft)"
                name="totalBuiltUpArea"
                register={register}
                required
                maxLength={16}
                validation={{ ...validateFloat() }}
                error={errors?.totalBuiltUpArea?.message}
              />
              <Input
                label="Number of Floors in Tower"
                name="numberOfFloors"
                register={register}
                required
                maxLength={12}
                validation={{ ...validateNumeric() }}
                error={errors?.numberOfFloors?.message}
              />
              <Input
                label="Number of Units in Tower"
                name="numberOfUnits"
                register={register}
                required
                maxLength={12}
                validation={{ ...validateNumeric() }}
                error={errors?.numberOfUnits?.message}
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={handlePreviousStep}
              >
                Previous
              </button>
              <button
                type="button"
                className="bg-indigo-500 text-white px-4 py-2 rounded"
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              {fields.map((field, index) => (
                <UnitToggle
                  key={field.id}
                  value={field.value}
                  onChange={handleFieldChange(index)}
                  label={`Floor ${index + 1}`}
                  name={`numberOfUnitsPerFloor.${index}.value`}
                  error={errors?.numberOfUnitsPerFloor?.[index]?.value?.message}
                />
              ))}
              <Input
                label="Total Carpet Area of each floor (Sqft)"
                name="totalCarpetArea"
                register={register}
                maxLength={16}
                validation={{ ...validateFloat() }}
                error={errors?.totalCarpetArea?.message}
              />

              <SwitchToggle
                label="Is ground floor dedicated to Parking only?"
                name="isGroundFloorParkingOnly"
                control={control}
                error={errors?.isGroundFloorParkingOnly?.message}
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={handlePreviousStep}
              >
                Previous
              </button>
              <button
                type="submit"
                className="bg-indigo-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </motion.div>
        )}
      </form>

      {propertyCalculation && (
        <div className="bg-green-200 p-4 rounded-lg shadow-md mt-8">
          <h2 className="text-xl font-bold mb-4">
            Property Calculation Results:
          </h2>
          <p>
            Total construction cost for each Tower: $
            {propertyCalculation.costPerTower}
          </p>
          <p>
            Total construction cost for project: $
            {propertyCalculation.totalCostWithoutConversion}
          </p>
          <p>
            So the total project cost would be(in millions): $
            {propertyCalculation.totalCost} million
          </p>
          <button
            onClick={handleReset}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Reset Form
          </button>
        </div>
      )}
    </div>
  );
};

export default CalculationForm;
