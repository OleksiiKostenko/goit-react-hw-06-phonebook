import { Form } from './Form';
import { Filter } from './Filter';
import { PhonebookList } from './PhonebookList';
import css from 'components/App.module.css';
import { Context } from './Context';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter, setFilter } from 'redux/filterSlice';
import { getContacts, deleteContact, addContact } from 'redux/contactsSlice';

export const App = () => {
  const distpatch = useDispatch();
  const filter = useSelector(getFilter);
  const contacts = useSelector(getContacts);

  // const addContact = data => {
  //   const contact = {
  //     id: nanoid(),
  //     name: data.name,
  //     number: data.number,
  //   };
  //   const names = contacts.map(contact => contact.name);
  //   if (names.includes(contact.name)) {
  //     alert(`${contact.name}is already in contacts.`);
  //     return;
  //   }
  //   return setContacts(contacts => [contact, ...contacts]);
  // };

  const hendleDeleteContact = id => {
    distpatch(deleteContact(id));
  };

  const filterContacts = evt => {
    const value = evt.target.value;
    distpatch(setFilter(value));
  };

  const normalizedFilter = filter.toLowerCase();
  const filteredList = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <Context>
      <div>
        <h1 className={css.title}>Phonebook</h1>
        <Form onSubmit={addContact} />
        <h2 className={css.contact_title}>Contacts</h2>
        <Filter filter={filter} onChange={filterContacts} />
        <PhonebookList
          contacts={filteredList}
          onDeleteContact={hendleDeleteContact}
        />
      </div>
    </Context>
  );
};
