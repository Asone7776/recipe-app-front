import React, {FC, useEffect, useState, ReactNode, useRef, useMemo} from 'react';
import {Select, Spin} from 'antd';
import {SelectProps} from 'antd/es/select';
import debounce from 'lodash/debounce';
import {axiosAuth} from "../axios-instances";

export interface DebounceSelectProps<ValueType = any>
    extends Omit<SelectProps<ValueType>, 'options' | 'children'> {
    fetchOptions: (search: string, lookupUrl: string) => Promise<ValueType[]>;
    debounceTimeout?: number,
    lookupUrl: string
}

function DebounceSelect<ValueType extends { key?: string; label: ReactNode; value: string | number } = any>({
                                                                                                                fetchOptions,
                                                                                                                debounceTimeout = 800,
                                                                                                                lookupUrl,
                                                                                                                ...props
                                                                                                            }: DebounceSelectProps) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState<ValueType[]>([]);
    const fetchRef = useRef(0);

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value: string) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);

            fetchOptions(value, lookupUrl).then(newOptions => {
                if (fetchId !== fetchRef.current) {
                    // for fetch callback order
                    return;
                }

                setOptions(newOptions);
                setFetching(false);
            });
        };

        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);

    return (
        <Select<ValueType>
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small"/> : null}
            {...props}
            options={options}
        />
    );
}

// Usage of DebounceSelect
interface LookUpValue {
    label: string;
    value: string;
}

async function fetchUserList(name: string, lookupUrl: string): Promise<LookUpValue[]> {
    return axiosAuth.get(lookupUrl, {
        params: {
            search: name ? name : null
        }
    }).then((response) => {
            // console.log('response',response.data);
            return response.data.map((item: any) => ({
                label: item.name,
                value: item.id
            }))
        }
    ).catch(error => {
    })
}

interface SearchComponentProps {
    lookupUrl: string,
    placeholder?: string,
    initialSearchValue: string,
    initialValue: string,
    onSelect: (val: string) => void
}

const SearchComponent: FC<SearchComponentProps> = ({
                                                       placeholder = 'Поиск',
                                                       lookupUrl,
                                                       initialSearchValue,
                                                       onSelect,
                                                       initialValue
                                                   }) => {
    const [value, setValue] = useState<LookUpValue[]>([]);

    return (
        <DebounceSelect
            mode="multiple"
            value={value}
            placeholder={placeholder}
            fetchOptions={fetchUserList}
            onChange={newValue => {
                setValue(newValue);
                onSelect(newValue);
            }}
            style={{width: '100%'}}
            lookupUrl={lookupUrl}
        />
    );
};

export default SearchComponent;
