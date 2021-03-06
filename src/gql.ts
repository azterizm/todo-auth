import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(input: { email: $email, password: $password })
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!) {
    createUser(input: { name: $name, email: $email, password: $password, role: CLIENT }) {
      _id
      name
      email
    }
  }
`;

export const ALL_TODOS = gql`
  query AllTodos($size: Int, $cursor: String) {
    allTodos(_size: $size, _cursor: $cursor) {
      data {
        _id
        title
        completed
        date
        list {
          _id
          title
          todos {
            data {
              _id
              title
              completed
            }
          }
        }
        user {
          _id
          name
          email
        }
      }
    }
  }
`;

export const TODO_BY_ID = gql`
  query TodoByTitle($id: ID!) {
    findTodoByID(id: $id) {
      _id
      title
      completed
      date
      list {
        _id
        title
      }
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation updateTodo($id: ID!, $title: String!, $completed: Boolean!, $date: Time) {
    updateTodo(id: $id, data: { title: $title, completed: $completed, date: $date }) {
      _id
      title
      completed
      date
    }
  }
`;

export const UPDATE_TODO_WITH_LIST = gql`
  mutation UpdateTodoWithList(
    $id: ID!
    $title: String!
    $completed: Boolean!
    $listID: ID!
    $date: Time
  ) {
    updateTodo(
      id: $id
      data: { title: $title, completed: $completed, date: $date, list: { connect: $listID } }
    ) {
      _id
      title
      completed
      date
      list {
        _id
        title
      }
    }
  }
`;

export const UPDATE_TODO_WITH_NO_LIST = gql`
  mutation UpdateTodoWithNoList($id: ID!, $title: String!, $completed: Boolean!, $date: Time) {
    updateTodo(
      id: $id
      data: { title: $title, completed: $completed, date: $date, list: { disconnect: true } }
    ) {
      _id
      title
      completed
      date
    }
  }
`;

export const UPDATE_TODO_WITH_CREATE_LIST = gql`
  mutation UpdateTodoWithCreateList(
    $id: ID!
    $title: String!
    $completed: Boolean!
    $userID: ID!
    $listTitle: String!
    $date: Time
  ) {
    updateTodo(
      id: $id
      data: {
        title: $title
        completed: $completed
        list: { create: { title: $listTitle, user: { connect: $userID } } }
        date: $date
      }
    ) {
      _id
      title
      completed
      date
      list {
        _id
        title
      }
    }
  }
`;

export const CREATE_TODO = gql`
  mutation CreateTodo($title: String!, $completed: Boolean!, $userID: ID!, $date: Time) {
    createTodo(
      data: { title: $title, completed: $completed, date: $date, user: { connect: $userID } }
    ) {
      _id
      title
      completed
      date
      user {
        _id
        name
        email
      }
    }
  }
`;

export const CREATE_TODO_WITH_LIST = gql`
  mutation CreateTodo(
    $title: String!
    $completed: Boolean!
    $userID: ID!
    $listID: ID
    $date: Time
  ) {
    createTodo(
      data: {
        title: $title
        completed: $completed
        date: $date
        user: { connect: $userID }
        list: { connect: $listID }
      }
    ) {
      _id
      title
      completed
      date
      user {
        _id
        name
        email
      }
      list {
        _id
        title
        todos {
          data {
            _id
            title
            completed
          }
        }
      }
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      _id
    }
  }
`;

export const DELETE_LIST = gql`
  mutation DeleteList($id: ID!) {
    deleteList(id: $id) {
      _id
    }
  }
`;

export const USER_QUERY = gql`
  query {
    allUsers {
      data {
        _id
        name
        email
      }
    }
  }
`;

export const ALL_LISTS = gql`
  query {
    allLists {
      data {
        _id
        title
        todos {
          data {
            _id
            title
            completed
            date
          }
        }
      }
    }
  }
`;

export const CREATE_LIST = gql`
  mutation CreateList($title: String!, $userID: ID!) {
    createList(data: { title: $title, user: { connect: $userID } }) {
      _id
      title
    }
  }
`;
