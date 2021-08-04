import React, {FC, useEffect, useState, ReactNode, useRef, useMemo} from 'react';
import {Select, Spin} from 'antd';
import {SelectProps} from 'antd/es/select';
import debounce from 'lodash/debounce';
import {axiosAuth} from "../axios-instances";
import {MultiSelectInterface} from "../types/common";

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
    }, [fetchOptions, debounceTimeout, lookupUrl]);
    useEffect(() => {
        // @ts-ignore
        debounceFetcher()
    }, [lookupUrl]);
    return (
        <Select<ValueType>
            showSearch
            allowClear
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small"/> : null}
            {...props}
            options={options}
        />
    );
}

// Usage of DebounceSelect
async function fetchUserList(name: string, lookupUrl: string): Promise<MultiSelectInterface[]> {
    return axiosAuth.get(lookupUrl, {
        params: {
            search: name ? name : null
        }
    }).then((response) => {
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
    initialSearchValue?: string,
    initialValue: any,
    onChange?: () => void,
    value?: number,
}

const SearchComponentSingle: FC<SearchComponentProps> = ({
                                                             placeholder = 'Поиск',
                                                             lookupUrl,
                                                             initialSearchValue,
                                                             onChange,
                                                             initialValue,
                                                             value
                                                         }) => {
    return (
        <DebounceSelect
            value={value}
            placeholder={placeholder}
            fetchOptions={fetchUserList}
            onChange={onChange}
            style={{width: '100%'}}
            lookupUrl={lookupUrl}
        />
    );
};

export default SearchComponentSingle;
