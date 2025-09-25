import { useThemeColor } from '@/hooks/use-theme-color';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { Controller, FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

type PickerOption = {
    label: string;
    value: string;
};

type FormPickerProps<T extends FieldValues = FieldValues, TName extends FieldPath<T> = FieldPath<T>> = {
    label: string;
    placeholder?: string;
    options: PickerOption[];
} & UseControllerProps<T, TName>;

export function FormPicker<T extends FieldValues = FieldValues, TName extends FieldPath<T> = FieldPath<T>>({
    label,
    placeholder = "Sélectionnez une option",
    options,
    control,
    name,
    rules
}: FormPickerProps<T, TName>) {
    const textColor = useThemeColor({}, 'text');
    const inputBackgroundColor = useThemeColor({light: '#f8f9fa', dark: '#2a2a2a'}, 'background');
    const borderColor = useThemeColor({light: '#e9ecef', dark: '#404040'}, 'icon');
    const placeholderColor = useThemeColor({light: '#6c757d', dark: '#9BA1A6'}, 'icon');

    return (
        <View style={styles.formGroup}>
            <Text style={[styles.label, { color: textColor }]}>{label}</Text>
            <View style={[styles.pickerContainer, { backgroundColor: inputBackgroundColor, borderColor: borderColor }]}>
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Picker
                            selectedValue={value}
                            style={[styles.picker, { color: textColor }]}
                            onValueChange={onChange}
                            dropdownIconColor={textColor}
                        >
                            <Picker.Item label={placeholder} value="" color={placeholderColor} />
                            {options.map((option) => (
                                <Picker.Item key={option.value} label={option.label} value={option.value} color="black" />
                            ))}
                        </Picker>
                    )}
                    name={name}
                    rules={rules}
                />
            </View>
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
    pickerContainer: {
        borderWidth: 1,
        borderRadius: 12,
        overflow: 'hidden',
    },
    picker: {
        height: 50,
    },
});