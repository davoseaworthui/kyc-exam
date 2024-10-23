"use client";
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { stepOneSchema } from '@/app/utils/validation';
import { useFormContext as UseCustomFormContext } from '@/app/utils/FormContext';
import { Button } from "@/components/ui/button";
import { CircleChevronRight } from 'lucide-react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";

export default function FormStepOne() {
    const router = useRouter();
    const { stepOneData, setStepOneData } = UseCustomFormContext();

    const methods = useForm({
        resolver: yupResolver(stepOneSchema),
        defaultValues: stepOneData,
    });

    const { handleSubmit, control, formState: { errors } } = methods;

    const onSubmit = (data: typeof stepOneData) => {
        setStepOneData(data);
        router.push('/step-two');
    };

    return (
        <FormProvider {...methods}>
            <Card>
                <CardHeader>
                    <CardTitle>1/2 Can you tell us something about yourself?</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <FormField
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Your email address</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Email" />
                                        </FormControl>
                                        <FormMessage>{errors.email?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="firstName"
                                control={control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="First Name" />
                                        </FormControl>
                                        <FormMessage>{errors.firstName?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="lastName"
                                control={control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Last Name" />
                                        </FormControl>
                                        <FormMessage>{errors.lastName?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="interest"
                                control={control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tell us your interests?</FormLabel>
                                        <FormControl>
                                            {/* RadioGroup for Interests */}
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                value={field.value || ''}
                                                defaultValue={field.value || ''}
                                                className="flex flex-row space-x-2"
                                            >
                                                <FormItem  className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="Cars" id="cars" />
                                                    <FormLabel htmlFor="cars">Cars</FormLabel>
                                                </FormItem>
                                                <FormItem  className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="Music" id="music" />
                                                    <FormLabel htmlFor="music">Music</FormLabel>
                                                </FormItem >
                                                <FormItem  className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="Sport" id="sport" />
                                                    <FormLabel htmlFor="sport">Sport</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage>{errors.interest?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit">Next <CircleChevronRight /></Button>
                    </CardFooter>
                </form>
            </Card>
        </FormProvider>
    );
}
