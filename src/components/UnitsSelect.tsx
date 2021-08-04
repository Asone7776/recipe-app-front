import React, {FC} from 'react';
import {Select} from 'antd';
import {UnitsSelectInterface} from "../types/common";
import * as events from "events";

const values: UnitsSelectInterface[] = [
    {
        id: 0,
        name: 'Гр'
    },
    {
        id: 1,
        name: 'Кг'
    },
    {
        id: 2,
        name: 'Чайная ложка'
    },
    {
        id: 3,
        name: 'Столовая ложка'
    },
    {
        id: 4,
        name: 'Лист'
    },
    {
        id: 5,
        name: 'По вкусу'
    }
];

interface OnChangeHandler {
    (): void;
}

interface MySelectProps {
    value?: number;
    onChange?: OnChangeHandler;
}

const UnitsSelect: FC<MySelectProps> = ({value, onChange}) => {
    const {Option} = Select;
    return (
        <Select value={value} onChange={onChange}>
            {values && values.map(item => (
                <Option key={item.id} value={item.id}>{item.name}</Option>
            ))}
        </Select>
    );
};

export default UnitsSelect;
