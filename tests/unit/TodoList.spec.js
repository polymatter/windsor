import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import TodoList from '@/components/TodoList.vue'
import TodoItem from "@/components/TodoItem";
import todos from '../todos.json';

describe('TodoList.vue', () => {
  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify();

    global.fetch = jest.fn(() => {
      return Promise.resolve({ json: () => Promise.resolve(todos) });
    });
  })

  it('displays all todos', async () => {
    const wrapper = mount(TodoList, {
      localVue,
      vuetify,
      propsData: { filter: '' },
    });
    expect(wrapper.text()).toContain('Todo'); //displays title
    await flushPromises(); // wait for loading data
    const todoItems = wrapper.findAllComponents(TodoItem);
    expect(todoItems.length).toBe(todos.length);
    todos.forEach(todo => {
      // every todo's title is displayed at least once (might be displayed twice if there are duplicates)
      expect(todoItems.filter(wrapper => wrapper.text().includes(todo.title)).length).toBeGreaterThanOrEqual(1);
    })
  });

  it('filters todos based on title', async () => {
    const filter = todos[4].title;
    const wrapper = mount(TodoList, {
      localVue,
      vuetify,
      propsData: { filter },
    });
    await flushPromises(); // wait for loading data
    const todoItems = wrapper.findAllComponents(TodoItem);
    const filteredTodos = todos.filter(todo => todo.title.includes(filter));
    expect(todoItems.length == filteredTodos.length);
    filteredTodos.forEach(todo => {
      expect(todoItems.filter(itemWrapper => itemWrapper.text().includes(todo.title)).length).toBeGreaterThanOrEqual(1);
    });
  });

  it('displays a new todo if it is created', async () => {

    const newItemTitle = 'this is a new item';
    const newTodo = {
      "userId": 1,
      "id": 201,
      "title": newItemTitle,
      "completed": false
    }

    const wrapper = mount(TodoList, {
      localVue,
      vuetify,
      propsData: { filter: '' },
    });
    await flushPromises(); // wait for loading data

    // ensure test data doesn't already have a todo with this title or we may get a false pass
    expect(todos.filter(todo => todo.title.includes(newItemTitle)).length).toEqual(0);
    const newItemTitleBox = wrapper.find("#newTodoTitle");
    await newItemTitleBox.setValue(newItemTitle);
    const createTodoBtn = wrapper.find("#createTodoBtn");

    global.fetch = jest.fn().mockImplementationOnce(() => {
      return Promise.resolve({ json: () => Promise.resolve(newTodo) });
    });
    global.document.querySelector = jest.fn().mockImplementationOnce(selector => wrapper.find(selector).element);

    await createTodoBtn.trigger("click");
    await flushPromises();
    const todoItems = wrapper.findAllComponents(TodoItem);
    expect(todoItems.filter(itemWrapper => itemWrapper.text().includes(newItemTitle)).length).toEqual(1);
  });

  it('removes an existing todo if it is deleted', async () => {
    const deleteTodoId = 4;
    const wrapper = mount(TodoList, {
      localVue,
      vuetify,
      propsData: { filter: '' },
    });
    await flushPromises(); // wait for loading data

    const todoItems = wrapper.findAllComponents(TodoItem);
    expect(todoItems.length).toEqual(todos.length);
    const deleteBtn = wrapper.find(`#deleteBtn-${deleteTodoId}`);

    global.fetch = jest.fn().mockImplementationOnce(() => {
      return Promise.resolve({ json: () => Promise.resolve({}) });
    });

    await deleteBtn.trigger("click");
    const todoItemsAfterDelete = wrapper.findAllComponents(TodoItem);
    expect(todoItemsAfterDelete.length).toEqual(todos.length - 1);
  });

  it('check a todo', async () => {
    const checkTodoId = 6;
    const wrapper = mount(TodoList, {
      localVue,
      vuetify,
      propsData: { filter: '' },
    });
    await flushPromises(); // wait for loading data

    const checkbox = wrapper.find(`#checkBox-${checkTodoId}`);
    expect(checkbox.attributes('aria-checked')).toBe("false");

    global.fetch = jest.fn().mockImplementationOnce(() => {
      return Promise.resolve({ json: () => Promise.resolve({ ...todos[checkTodoId], checked: true }) });
    });

    await checkbox.trigger("click");
    expect(checkbox.attributes('aria-checked')).toBe("true");
  });
});
