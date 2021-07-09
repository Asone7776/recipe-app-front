import React, {useRef, useState, useMemo, useEffect} from 'react';
import {Select, Spin} from 'antd';
import debounce from 'lodash/debounce';
import {axiosAuth} from "../axios-instances";

function DebounceSelect({initialSearchValue, fetchOptions, debounceTimeout = 800, ...props}) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const fetchRef = useRef(0);
    useEffect(() => {
        debounceFetcher(initialSearchValue || '');
    }, [initialSearchValue]);
    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);
            fetchOptions(value).then((newOptions) => {
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
        <Select
            placeholder={'Выберите рецепт'}
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small"/> : null}
            {...props}
            options={options}
        />
    );
} // Usage of DebounceSelect

async function fetchList(name) {
    return axiosAuth.get('/api/recipes/lookup', {
        params: {
            search: name ? name : null
        }
    }).then((response) => {
            // console.log('response',response.data);
            return response.data.map((item) => ({
                label: item.name,
                value: item.id
            }))
        }
    ).catch(error => {
        // console.log('resp', error.response.data.detail);
    })
}

const SearchAllRecipes = ({initialSearchValue, onUserSelect, initialValue}) => {
    const [value, setValue] = useState('');
    useEffect(() => {
        setValue(initialValue);
    }, [initialValue])
    return (
        <DebounceSelect
            initialSearchValue={initialSearchValue}
            allowClear
            showSearch
            value={value}
            fetchOptions={fetchList}
            onChange={(newValue) => {
                setValue(newValue);
                onUserSelect(newValue);
            }}
            style={{
                width: '100%',
            }}
        />
    );
};

export default SearchAllRecipes;
