import React, {FC, useState, useEffect} from 'react';
import {Select} from 'antd';
import {UsersLookupInterface} from "../types/users";
import {RecipesLookupInterface} from "../types/recipes";

const {Option} = Select;

export interface SearchProps {
    placeholder?: string,
    isLoading: boolean,
    value: string | null,
    options: UsersLookupInterface[] | RecipesLookupInterface[],
    whenSearch: (val: string) => void
}

const RemoteSearch: FC<SearchProps> = ({whenSearch, options, value, placeholder = 'Поиск', isLoading}) => {
    const [search, setSearch] = useState('');

    const onChange = (value: string) => {
        console.log(`selected ${value}`);
    }

    const onSearch = (val: string) => {
        setSearch(val);
    }

    useEffect(() => {
        whenSearch(search);
    }, [whenSearch, search]);

    console.log(options);
    return (
        <Select
            showSearch
            loading={isLoading}
            placeholder={placeholder}
            onChange={onChange}
            searchValue={search}
            // onBlur={onBlur}
            onSearch={onSearch}
            // value={value ? value : ''}
        >
            <Option value="">Не выбрано</Option>
            {options && options.map(item => (
                <Option key={item.id} value={item.id}>{item.name}</Option>
            ))}
        </Select>
    )
};
export default RemoteSearch;
