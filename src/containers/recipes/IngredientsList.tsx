import React, {FC, Fragment} from 'react';
import {Button, Col, Form, Row, Tooltip, InputNumber} from "antd";
import {PlusOutlined, MinusCircleOutlined} from "@ant-design/icons";
import SearchComponentSingle from "../../components/SearchComponentSingle";
import UnitsSelect from "../../components/UnitsSelect";


const IngredientsList: FC = () => {
    return (
        <Form.List name="ingredients">
            {(fields, {add, remove}) => {
                return (
                    <>
                        <Row gutter={16}>
                            {fields.map(({key, name, fieldKey, ...restField}) => (
                                <Fragment key={key}>
                                    <Col span={7}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'ingredient_id']}
                                            fieldKey={[fieldKey, 'ingredient_id']}
                                            rules={[{required: true, message: 'Выберите ингредиенты'}]}
                                        >
                                            <SearchComponentSingle
                                                lookupUrl={'/api/ingredients/lookup'}
                                                initialValue={''}
                                                placeholder={'Выберите ингредиент'}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={7}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'count']}
                                            fieldKey={[fieldKey, 'count']}
                                            rules={[{required: true, message: 'Введите количество'}]}
                                        >
                                            <InputNumber
                                                type={'number'}
                                                min={0}
                                                className={'full-width'}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={7}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'unit']}
                                            fieldKey={[fieldKey, 'unit']}
                                            rules={[{required: true, message: 'Выберите единицу измерения'}]}
                                        >
                                            <UnitsSelect/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={3} className={'center-right'}>
                                        <Form.Item>
                                            <Tooltip title={'Удалить'}>
                                                <MinusCircleOutlined onClick={() => remove(name)}/>
                                            </Tooltip>
                                        </Form.Item>
                                    </Col>
                                </Fragment>
                            ))}
                        </Row>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Button type="dashed" onClick={() => add({
                                    ingredient_id: undefined,
                                    count: 0,
                                    unit: undefined
                                })} block icon={<PlusOutlined/>}>
                                    Добавить ингредиент
                                </Button>
                            </Col>
                        </Row>
                    </>
                )
            }}
        </Form.List>
    );
};

export default IngredientsList;
