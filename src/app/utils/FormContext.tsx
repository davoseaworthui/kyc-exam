"use client";
import React, { createContext, useContext, useState } from 'react';

interface StepOneFormValues {
    email: string;
    firstName: string;
    lastName: string;
    interest: 'Cars' | 'Music' | 'Sport' | '';
}

interface FormContextType {
    stepOneData: StepOneFormValues;
    setStepOneData: React.Dispatch<React.SetStateAction<StepOneFormValues>>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [stepOneData, setStepOneData] = useState<StepOneFormValues>({
        email: '',
        firstName: '',
        lastName: '',
        interest: '',
    });

    return (
        <FormContext.Provider value={{ stepOneData, setStepOneData }}>
            {children}
        </FormContext.Provider>
    );
};

export const useFormContext = (): FormContextType => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
};
