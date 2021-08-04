import React, {FC} from 'react';
import {Form, Input, Button, Row, Col, Tooltip} from 'antd';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {SortableContainer, SortableElement, SortableHandle, SortEnd, SortEvent} from 'react-sortable-hoc';
import {MenuOutlined} from '@ant-design/icons';

const DragHandle = SortableHandle(() => <MenuOutlined style={{cursor: 'grab', color: '#999'}}/>);
// @ts-ignore
const SortableItem = SortableElement(({field, remove}) => {
    return (
        <Row gutter={16} key={`form-item-${field.key}`}>
            <Col span={1} className={'center-left'}>
                <DragHandle/>
            </Col>
            <Col span={22}>
                <Form.Item
                    {...field}
                    key={[field.fieldKey, 'name']}
                    label="Заголовок"
                    name={[field.name, 'name']}
                    fieldKey={[field.fieldKey, 'name']}
                >
                    <Input type={'text'}/>
                </Form.Item>
                <Form.Item
                    {...field}
                    key={[field.fieldKey, 'description']}
                    label="Описание"
                    name={[field.name, 'description']}
                    fieldKey={[field.fieldKey, 'description']}
                    rules={[{required: true, message: 'Введите описание'}]}
                >
                    <TextArea/>
                </Form.Item>
            </Col>
            <Col span={1} className={'center-right'} draggable={false}>
                <Tooltip title={'Удалить'}>
                    <MinusCircleOutlined onClick={() => remove(field.name)}/>
                </Tooltip>
            </Col>
        </Row>
    )
});


// @ts-ignore
const SortableList = SortableContainer(({fields, remove}) => {
    return (
        <div>
            {fields.map((field: any, index: number) => (
                <SortableItem key={`sortable-${field.key}`} remove={remove} index={index} field={field}/>
            ))}
        </div>
    );
});

const {TextArea} = Input;

interface RecipeDetailInterface {
    onSort: (sort: SortEnd, event: SortEvent) => void
}

const RecipeDetail: FC<RecipeDetailInterface> = ({onSort}) => {
    return (
        <>
            <Form.List name="details">
                {(fields, {add, remove}) => {
                    // @ts-ignore
                    return (
                        <>
                            <SortableList fields={fields} remove={remove} onSortEnd={onSort}/>
                            <Row gutter={16} style={{marginBottom: 20}}>
                                <Col span={6}>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                        Добавить шаг
                                    </Button>
                                </Col>
                            </Row>
                        </>
                    )
                }}
            </Form.List>
        </>
    );
};

export default RecipeDetail;
