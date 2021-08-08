import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useHistory} from 'react-router-dom';
import {Form, Input, Button, Col, Row, Typography, Select, TimePicker, Space} from 'antd';
import {IRootState} from "../../redux/store";
import {axiosAuth} from "../../axios-instances";
import {RecipeInterface} from "../../types/recipes";
import {addRecipe, updateRecipe} from "../../redux/actions/recipesActions";
import {Level} from "../../types/level";
import SearchComponent from "../../components/SearchComponent";
import moment from "moment";
import {CategoryInterface} from "../../types/categories";
import {TagInterface} from "../../types/tags";
import {IngredientInterface} from "../../types/ingredients";
import RecipeDetail from "./RecipeDetail";
import IngredientsList from "./IngredientsList";
import arrayMove from "array-move";
import {RecipesDetailsInterface} from '../../types/recipes';

interface RecipeValues {
    name: string,
    description?: string,
    time_to_complete?: string,
    level_id?: string,
    categories?: CategoryInterface[],
    tags?: TagInterface[],
    ingredients?: IngredientInterface[],
    details?: RecipesDetailsInterface[]
}

const AddAndEditRecipe: FC = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const [editRecipe, setEditRecipe] = useState<RecipeInterface | undefined>(undefined);
    const isLoading = useSelector<IRootState, boolean>((state) => state.recipes.isLoading);
    const [form] = Form.useForm();
    const {Title} = Typography;
    const {TextArea} = Input;
    const {Option} = Select;
    const [levels, setLevels] = useState([]);
    useEffect(() => {
        if (location.state && location.state.recipeId) {
            axiosAuth.get(`/api/recipes/${location.state.recipeId}`).then((response): void => {
                let {data} = response;
                setEditRecipe({
                    ...data,
                    categories: data.categories && data.categories.map((cat: any) => {
                        return {
                            value: cat.id,
                            label: cat.name
                        }
                    }),
                    tags: data.tags && data.tags.map((tag: TagInterface) => {
                        return {
                            value: tag.id,
                            label: tag.name
                        }
                    })
                });
            });
        }
    }, [location])
    useEffect(() => {
        if (editRecipe) {
            let {name, description, time_to_complete, level_id, categories, tags, ingredients, details} = editRecipe;
            form.setFieldsValue({
                name,
                description,
                time_to_complete: time_to_complete && moment(time_to_complete, 'HH:mm:ss'),
                level_id,
                categories,
                tags,
                ingredients: ingredients && ingredients.map(ingItem => {
                    return {
                        ingredient_id: ingItem.pivot && ingItem.pivot.ingredient_id,
                        count: ingItem.pivot && ingItem.pivot.count,
                        unit: ingItem.pivot && ingItem.pivot.unit,
                    };
                }),
                details
            })
        }
    }, [editRecipe, form]);
    useEffect(() => {
        axiosAuth.get('/api/levels').then((response): void => {
            setLevels(response.data);
        });
    }, []);
    const onFinish = (values: RecipeValues) => {
        let data = {
            ...values,
            time_to_complete: values.time_to_complete && moment(values.time_to_complete).format('HH:mm:ss'),
            categories: values.categories && values.categories.map((cat) => cat.value),
            tags: values.tags && values.tags.map((tag) => tag.value),
        };
        if (editRecipe) {
            dispatch(updateRecipe({
                ...data,
                id: editRecipe.id,
            }))
        } else {
            dispatch(addRecipe(data));
        }
    };
    return (
        <Form
            name="cats-form"
            className="add-and-edit-category"
            form={form}
            layout={'vertical'}
            onFinish={onFinish}
            onValuesChange={() => {
                console.log(form.getFieldsValue());
            }}
            initialValues={{
                time_to_complete: moment('00:00:00', 'HH:mm:ss')
            }}
        >
            <Title level={3}>{editRecipe ? 'Редактировать рецепт' : 'Добавить рецепт'}</Title>
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="name"
                        label="Название"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста введите название',
                            },
                        ]}
                    >
                        <Input type={'text'}/>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        name="description"
                        label="Описание"
                    >
                        <TextArea/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="time_to_complete"
                        label="Время на выполнение"
                    >
                        <TimePicker showNow={false} style={{width: '100%'}}/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        label="Уровень сложности"
                        name="level_id"
                    >
                        <Select>
                            {levels && levels.map((level: Level) => (
                                <Option key={level.id} value={level.id} children={level.name}/>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        label="Категории"
                        name="categories"
                    >
                        <SearchComponent
                            lookupUrl={'api/categories/lookup'}
                            placeholder={'Выберите категории'}
                            initialValue={editRecipe && editRecipe.categories ? editRecipe.categories : []}
                            onSelect={(value) => {
                                form.setFieldsValue({categories: value});
                            }}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        label="Тэги"
                        name="tags"
                    >
                        <SearchComponent
                            lookupUrl={'api/tags/lookup'}
                            placeholder={'Выберите тэги'}
                            initialValue={editRecipe && editRecipe.tags ? editRecipe.tags : []}
                            onSelect={(value) => {
                                form.setFieldsValue({tags: value});
                            }}
                        />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Title level={3}>Ингредиенты</Title>
                    <IngredientsList/>
                </Col>
                <Col span={24}>
                    <Title level={3}>Шаги приготовления</Title>
                    <RecipeDetail onSort={({oldIndex, newIndex}) => {
                        const details = form.getFieldValue('details');
                        form.setFieldsValue({
                            details: arrayMove(details, oldIndex, newIndex)
                        })
                    }}/>
                </Col>
                <Col span={24}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item>
                                <Button type="primary" onClick={() => {
                                    //@ts-ignore
                                    history.goBack();
                                }}>
                                    Назад
                                </Button>
                            </Form.Item>
                        </Col>
                        <Col span={12} className={'actions-right'}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="add-edit-category"
                                        loading={isLoading}>
                                    {editRecipe && Object.keys(editRecipe).length > 0 ? "Обновить" : "Добавить"}
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
    );
};

export default AddAndEditRecipe;
