import { gql } from '@apollo/client';


export const ADD_CONTACT = gql`
    mutation AddContactWithPhones(
        $first_name: String!, 
        $last_name: String!, 
        $phones: [phone_insert_input!]!
        ) {
        insert_contact(
            objects: {
                first_name: $first_name, 
                last_name: $last_name, 
                phones: { 
                    data: $phones
                    }
                }
            ) {
            returning {
            first_name
            last_name
            id
            phones {
                number
            }
            }
        }
    }
`;

export const GET_CONTACT = gql`
    query {
        contact {
            id
            first_name
            last_name
        }
    }
`;

export const GET_CONTACT_DETAIL = gql`
    query GetContactDetail($id: Int!){
        contact_by_pk(id: $id) {
            last_name
            id
            first_name
            created_at
            phones {
                number
            }
        }
    }
`;


export const EDIT_CONTACT = gql`
    mutation EditContactById($id: Int!, $_set: contact_set_input) {
        update_contact_by_pk(pk_columns: {id: $id}, _set: $_set) {
        id
        first_name
        last_name
        phones {
            number
        }
        }
    }  
`;

export const EDIT_PHONE_NUMBER = gql`
    mutation EditPhoneNumber($pk_columns: phone_pk_columns_input!, $new_phone_number:String!) {
        update_phone_by_pk(pk_columns: $pk_columns, _set: {number: $new_phone_number}) {
        contact {
            id
            last_name
            first_name
            created_at
            phones {
            number
            }
        }
        }
    }
`;

export const DELETE_CONTACT_BY_ID = gql`
    mutation MyMutation($id: Int!) {
        delete_contact_by_pk(id: $id) {
            first_name
            last_name
            id
        }
    }
`;