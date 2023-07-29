import React from "react";
import { TextInput, Box, Textarea, Group, Button, NumberInput } from "@mantine/core";
import { useForm } from '@mantine/form';

export const validateString = (value) => {
    return value?.length < 3 || value === null
        ? "Must have at least 3 characters"
        : null;
};

const AddressBox = ({ nextStep }) => {
    // Replace this dummyData with your actual dummy database or mock data
    const addressDetail = {
        address:
        "Jl. Kaya Raya UKDW Dormitory no.8 Ngropoh, Chesurtunggal, Kec. Depok Kab.Sleman, Yogyakarta",
    };

    const form = useForm({
        initialValues: {
            address: addressDetail.address
        },

        validationRules: {
            address: (value) => validateString(value),
        },
    });

    const handleSubmit = () => {
        const { errors, values } = form.getState();
        if (!errors.title && !errors.description && !errors.price && !errors.guests) {
            // Replace this with your actual database update logic
            console.log("Form submitted:", values);
            nextStep();
        }
    };

    return (
        <Box maxWidth="50%" mx="auto" my="md">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Textarea
                    placeholder="Address"
                    label="Address Details"
                    withAsterisk
                    {...form.getInputProps("address")}
                />
            </form>
        </Box>
    );
}

export default AddressBox;