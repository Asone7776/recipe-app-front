import {
    TAGS_LOADING,
    GET_TAGS_SUCCESS,
    GET_TAGS_FAILURE,
    ADD_TAG_SUCCESS,
    ADD_TAG_FAILURE,
    UPDATE_TAG_SUCCESS,
    UPDATE_TAG_FAILURE,
    DELETE_TAG_SUCCESS,
    DELETE_TAG_FAILURE
} from "../constants";
import {TagsInterface} from "../../types/tags";

const initialState: TagsInterface = {
    data: {
        tags: {
            current_page: 1,
            data: [],
            total: 0
        },
        type: ""
    },
    isLoading: false
};

export const tagsReducer = (state = initialState, action: any): TagsInterface => {
    switch (action.type) {
        case GET_TAGS_SUCCESS:
            return {
                data: {
                    tags: action.payload,
                    type: action.type
                },
                isLoading: false
            };
        case GET_TAGS_FAILURE:
            return {
                data: {
                    tags: state.data.tags,
                    type: action.type
                },
                isLoading: false
            };
        case ADD_TAG_SUCCESS:
            return {
                data: {
                    tags: {
                        ...state.data.tags,
                        data: [state.data.tags.data, {...action.payload}]
                    },
                    type: action.type
                },
                isLoading: false
            };
        case ADD_TAG_FAILURE:
            return {
                data: {
                    tags: state.data.tags,
                    type: action.type
                },
                isLoading: false
            };
        case UPDATE_TAG_SUCCESS:
            return {
                data: {
                    tags: {
                        ...state.data.tags,
                        data: state.data.tags.data && state.data.tags.data.map(item => {
                            if (item.id === action.payload.id) {
                                item = {
                                    ...action.payload,
                                }
                            }
                            return item;
                        })
                    },
                    type: action.type
                },
                isLoading: false
            };
        case UPDATE_TAG_FAILURE:
            return {
                data: {
                    tags: state.data.tags,
                    type: action.type
                },
                isLoading: false
            };
        case DELETE_TAG_SUCCESS:
            return {
                ...state,
                data: {
                    tags: {
                        ...state.data.tags,
                        data: state.data.tags.data && state.data.tags.data.filter(item => item.id !== action.payload)
                    },
                    type: action.type
                },
                isLoading: false
            };
        case DELETE_TAG_FAILURE:
            return {
                data: {
                    tags: state.data.tags,
                    type: action.type
                },
                isLoading: true
            };
        case TAGS_LOADING:
            return {
                data: {
                    tags: state.data.tags,
                    type: action.type
                },
                isLoading: true
            };
        default:
            return state;
    }
}
export default tagsReducer;
