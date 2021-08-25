const addBtn = document.querySelector('.add-btn');
const resetBtn = document.querySelector('.reset-btn');
const randomizeBtn = document.querySelector('.randomize-btn');
const teamList = document.querySelector('.team-list');

let counter = 0;
let numbers = [];
let ranSet = [];
let randomized = false;
let hitReset = false;

addBtn.addEventListener('click', function (e) {
  try {
    hitReset = false;
    if (document.querySelector('.loading')) {
      return;
    }
    if (randomized) {
      randomized = false;
      resetInputs();
    }
    removeAlert();
    removeLoading();

    if (counter < 20) {
      counter++;

      const li = document.createElement('li');
      li.className = 'team';

      li.innerHTML = `
            <label for="team-name">${counter + ''}</label>
            <input type="text" id="team-name${counter}" maxlength="20" />
        `;
      addHtml(counter, li);
    }
  } catch (err) {
    console.error(err);
  }
  e.preventDefault();
});

resetBtn.addEventListener('click', function (e) {
  hitReset = true;
  randomized = false;
  removeLoading();
  removeAlert();
  resetInputs();
  e.preventDefault();
});

randomizeBtn.addEventListener('click', function (e) {
  try {
    hitReset = false;
    if (document.querySelector('.loading')) {
      return;
    }
    if (document.querySelector('.team-list--1').firstElementChild === null) {
      addAlert('Add teams before randomizing');
      removeLoading();
      return;
    }
    if (randomized) {
      randomized = false;
      resetInputs();
      removeLoading();
      addAlert('App has reset');
      return;
    }
    randomized = true;
    // Clear random set and reset numbers
    if (ranSet) {
      ranSet = [];
    }
    numbers = [];

    const teams = [];
    randomNumbers(counter);
    // Fill teams array
    for (let i = 1; i > 0 && i <= counter; i++) {
      let value = document.getElementById(`team-name${i}`).value;
      document.getElementById(`team-name${i}`).value = '';
      teams.push(value);
    }
    // Create object for randomized team with number and push into array
    for (i = 0; i < counter; i++) {
      const teamNumber = {
        number: numbers[i],
        team: teams[i],
      };
      ranSet.push(teamNumber);
    }
    // Sort items by number
    ranSet.sort((a, b) => {
      let fa = a.number,
        fb = b.number;

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    resetInputs();
    addLoading();
    setTimeout(function () {
      removeLoading();
      if (hitReset === true) {
        return;
      }
      // Create html for randomized teams
      ranSet.forEach(function (set) {
        const li = document.createElement('li');
        li.className = 'random';

        li.innerHTML = `
        <span class="set-number">${set.number}.</span>  <span class="set-team">${set.team}</span>
      `;
        addHtml(set.number, li);
      });
    }, 3000);
  } catch (err) {
    console.error(err);
  }
  e.preventDefault();
});

const resetInputs = () => {
  for (let i = 3; i > 0; i--) {
    let teamsList = document.querySelector(`.team-list--${i}`);
    if (teamsList.hasChildNodes()) {
      while (teamsList.firstChild) {
        teamsList.removeChild(teamsList.lastChild);
      }
    }
  }
  counter = 0;
};

const randomNumbers = (totalTeams) => {
  for (i = 0; i <= totalTeams && numbers.length < totalTeams; i++) {
    const number = Math.floor(Math.random() * totalTeams + 1);
    if (!numbers.includes(number)) {
      numbers.push(number);
    } else if (numbers.includes(number)) {
      randomNumbers(totalTeams);
    }
  }
};

const addHtml = function (number, li) {
  if (number < 8) {
    document
      .querySelector('.team-list--1')
      .insertAdjacentElement('beforeend', li);
  } else if (number >= 8 && number < 15) {
    document
      .querySelector('.team-list--2')
      .insertAdjacentElement('beforeend', li);
  } else if (number >= 15 && number < 21) {
    document
      .querySelector('.team-list--3')
      .insertAdjacentElement('beforeend', li);
  } else {
    return;
  }
};

const addAlert = function (text) {
  if (document.querySelector('.alert')) {
    document.querySelector('.alert').innerHTML = '';
  }
  const markup = `
                    <div class="alert">
                      <p class="alert-msg">${text}</p>
                    </div>
                    `;
  teamList.insertAdjacentHTML('afterbegin', markup);
  setTimeout(function () {
    removeAlert();
  }, 3000);
};

const addLoading = function () {
  const markup = `
                  <div class="loading">
                    <ion-icon class="load-icon" name="american-football-outline"></ion-icon>
                  </div>
                  `;
  teamList.insertAdjacentHTML('afterbegin', markup);
};

const removeAlert = function () {
  if (document.querySelector('.alert')) {
    document.querySelector('.alert').remove(document.querySelector('.alert'));
  }
};

const removeLoading = function () {
  if (document.querySelector('.loading')) {
    document
      .querySelector('.loading')
      .remove(document.querySelector('.loading'));
  }
};
