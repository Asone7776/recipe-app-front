import React, {FC} from 'react';
import {Select} from 'antd';

const {Option} = Select;

export interface SearchProps {
    placeholder?: string,
    isLoading: boolean
}

const RemoteSearch: FC<SearchProps> = ({placeholder = 'Поиск', isLoading}) => {

    function onChange(value: string) {
        console.log(`selected ${value}`);
    }

    function onBlur() {
        console.log('blur');
    }


    function onSearch(val: string) {
        console.log('search:', val);
    }

    return (
        <Select
            showSearch
            loading={isLoading}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            onSearch={onSearch}
        >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
        </Select>
    )
};
export default RemoteSearch;
