import { useThemeColor } from '@/hooks/use-theme-color';
import React from 'react';
import { Controller, FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

type FormFieldProps<T extends FieldValues = FieldValues, TName extends FieldPath<T> = FieldPath<T>> = {
    label: string;
    placeholder?: string;
    multiline?: boolean;
    numberOfLines?: number;
} & UseControllerProps<T, TName> & Omit<TextInputProps, 'onChangeText' | 'onBlur' | 'value'>;

export function FormField<T extends FieldValues = FieldValues, TName extends FieldPath<T> = FieldPath<T>>({
    label,
    placeholder,
    multiline = false,
    numberOfLines = 1,
    control,
    name,
    rules,
    ...textInputProps
}: FormFieldProps<T, TName>) {
    const textColor = useThemeColor({}, 'text');
    const inputBackgroundColor = useThemeColor({light: '#f8f9fa', dark: '#2a2a2a'}, 'background');
    const borderColor = useThemeColor({light: '#e9ecef', dark: '#404040'}, 'icon');
    const placeholderColor = useThemeColor({light: '#6c757d', dark: '#9BA1A6'}, 'icon');

    return (
        <View style={styles.formGroup}>
            <Text style={[styles.label, { color: textColor }]}>{label}</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        style={[
                            styles.input,
                            multiline && styles.textArea,
                            {
                                backgroundColor: inputBackgroundColor,
                                borderColor: borderColor,
                                color: textColor,
                            }
                        ]}
                        placeholder={placeholder}
                        placeholderTextColor={placeholderColor}
                        multiline={multiline}
                        numberOfLines={numberOfLines}
                        {...textInputProps}
                    />
                )}
                name={name}
                rules={rules}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    formGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        paddingVertical: 12,
        textAlignVertical: 'top',
    },
});