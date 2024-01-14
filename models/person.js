// personModel.js

const mongoose = require('mongoose');

// Define the Person model
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  favoriteFoods: { type: [String] }
});

// Create Person Model
const Person = mongoose.model('Person', personSchema);

// Function to create multiple people using Model.create()
const createManyPeople = async (arrayOfPeople) => {
  try {
    const result = await Person.create(arrayOfPeople);
    console.log('People created successfully:', result);
  } catch (error) {
    console.error('Error creating people:', error);
  }
};

// Example data (arrayOfPeople)
const peopleData = [
  { name: 'John', age: 30, email: 'john@example.com' ,favoriteFoods: ['Pizza', 'skalop']},
  { name: 'Alice', age: 25, email: 'alice@example.com', favoriteFoods: ['foulla', 'kouskous']},
  { name: 'Bob', age: 35, email: 'bob@example.com' ,favoriteFoods: ['pain', 'makrouna']},
  { name: 'nour', age: 29, email: 'nour@example.com', favoriteFoods: ['tomatem', 'any']},
  { name: 'houda', age: 29, email: 'houda@example.com',favoriteFoods: ['Pizza', 'roz'] }
];

// Call the function to create many people
createManyPeople(peopleData);

// Utilise model.find() 

async function findPeople() {
  try {
    // Use the await keyword to wait for the results
    const people = await Person.find({ name: 'John' }).exec();

    // Handle the results here
    console.log('People with name John:', people);
  } catch (error) {
    // Handle any errors that occur during the operation
    console.error('Error finding people:', error);
  }
}

// Call the function to find people
findPeople();

 
// Function to find a person by favorite food using Model.findOne()
const findPersonByFavoriteFood = async (food) => {
  try {
    const person = await Person.findOne({ favoriteFoods: food }).exec();
    
    if (person) {
      console.log(`Person with favorite food ${food}:`, person);
    } else {
      console.log(`No person found with favorite food ${food}`);
    }
  } catch (error) {
    console.error('Error finding person:', error);
  }
};

// Example: Call the function to find a person by favorite food
const favoriteFoodToSearch = 'Pizza'; 
findPersonByFavoriteFood(favoriteFoodToSearch);





// Function to find a person by _id using Model.findById()
const findPersonById = async (personId) => {
  try {
    const person = await Person.findById(personId).exec();

    if (person) {
      console.log(`Person with _id ${personId}:`, person);
    } else {
      console.log(`No person found with _id ${personId}`);
    }
  } catch (error) {
    console.error('Error finding person by _id:', error);
  }
};

// Example: Call the function to find a person by _id
const personIdToSearch = '65a449d2f517d128e129101d'; 
findPersonById(personIdToSearch);




// Function to perform classic update by finding a person by _id
const updatePersonById = async (personId) => {
  try {
    // Find the person by _id
    const person = await Person.findById(personId).exec();

    if (person) {
      // Add 'hamburger' to the list of favoriteFoods
      person.favoriteFoods.push('hamburger');

      // Save the updated Person
      await person.save();

      console.log(`Person with _id ${personId} updated:`, person);
    } else {
      console.log(`No person found with _id ${personId}`);
    }
  } catch (error) {
    console.error('Error updating person by _id:', error);
  }
};

// Example: Call the function to perform classic update
const personIdToUpdate = '65a4496617552c0b779d7354'; 
updatePersonById(personIdToUpdate);



// Function to perform new update using findOneAndUpdate
const updatePersonByName = async (personName) => {
  try {
    // Find and update the person by Name
    const updatedPerson = await Person.findOneAndUpdate(
      { name: personName },
      { $set: { age: 20 } },
      { new: true }
    ).exec();

    if (updatedPerson) {
      console.log(`Person with name ${personName} updated:`, updatedPerson);
    } else {
      console.log(`No person found with name ${personName}`);
    }
  } catch (error) {
    console.error('Error updating person by name:', error);
  }
};

// Example: Call the function to perform new update
const personNameToUpdate = 'John'; // Replace with the name you want to update
updatePersonByName(personNameToUpdate);



// Function to delete a person by _id using findByIdAndRemove
const deletePersonById = async (personId) => {
  try {
    // Find and remove the person by _id
    const removedPerson = await Person.findByIdAndRemove(personId).exec();

    if (removedPerson) {
      console.log(`Person with _id ${personId} removed:`, removedPerson);
    } else {
      console.log(`No person found with _id ${personId}`);
    }
  } catch (error) {
    console.error('Error deleting person by _id:', error);
  }
};

// Example: Call the function to delete a person by _id
const personIdToDelete = '65a449d2f517d128e129101d'; 
deletePersonById(personIdToDelete);



// Function to delete people by name using Model.remove()
const deletePeopleByName = async (nameToDelete) => {
  try {
    // Remove all people with the specified name
    const result = await Person.remove({ name: nameToDelete }).exec();

    if (result.deletedCount > 0) {
      console.log(`People with name ${nameToDelete} deleted. Deleted count:`, result.deletedCount);
    } else {
      console.log(`No people found with name ${nameToDelete}`);
    }
  } catch (error) {
    console.error('Error deleting people by name:', error);
  }
};

// Example: Call the function to delete people by name
const nameToDelete = 'john';
deletePeopleByName(nameToDelete);





module.exports = Person;
