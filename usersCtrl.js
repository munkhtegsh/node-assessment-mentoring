const data = require('./userData.json');
// const id = 1;
module.exports = {
  _getUsers: (req, res) => {
    const { age, lastname, email, favorites } = req.query;
    console.log( age )
    const { userId } = req.params;
    if (age) {
      let userByAge = data.filter(user => {
        if (user.age < +age ) {
          return user
        }  
      })
      // console.log(age)
      res.status(200).send(userByAge)
    } else if (lastname) {
      let userName = data.filter(item => {
        if (item.last_name === lastname) {
          return item;
        }
      });
      res.status(200).send(userName);
    } else if (email) {
      let userEmail = data.filter(item => {
        if (item.email === email) {
          return item;
        }
      });
      res.status(200).send(userEmail);
    } else if (favorites) {

      let userFav = data.filter(item => {
        if (item.favorites.includes(favorites)) {
          return item;
        }
      })
      res.status(200).send(userFav);

    }  else {
      res.status(200).send(data)
    }
  },

  _getUserById: (req, res) => {
    const { userId } = req.params;
    if (+userId) {
      let userById = data.filter(item => {
       if (item.id === +userId) {
          return item;
        } 
      })

      if (userById.length === 0) {
         res.status(404).json(null)
      } else {
        res.status(200).send(userById[0]);
      }
    
    }
  },

  _getAdmins: (req, res) => {
    let admins = data.filter(item => {
      if (item.type === 'admin') {
        return item;
      }
    })
    // console.log(admins)
    res.status(200).send(admins)
  },

  _getNonAdmins: (req, res) => {
    let nonAdmin = data.filter(item => {
      if (item.type !== 'admin') {
        return item;
      }
    });
    res.status(200).send(nonAdmin);
  },
  
  _getUserType: (req, res) => {
    const { userType } = req.params;
    let userTypes = data.filter(item => {
      if (item.type === userType) {
        return item;
      }
    })
    res.status(200).send(userTypes);
  },

  _changeUser: (req, res) => {
    const { userId } = req.params;
    // console.log(userId, req.body)
    let updated = data.map(item => {
      if (item.id === +userId) {
        item = req.body;
      }
      return item;
    })
    // console.log(updated)
    res.status(200).send(updated);
  },

  _addUser: (req, res) => {
    // console.log(req)
    let lastUserId = data[data.length - 1].id;
    lastUserId++;
    let obj = {...req.body, id: lastUserId};
    // console.log(obj)
    data.push(obj)
    res.status(200).send(data);
  },

  _deleteUser: (req, res) => {
    const { userId } = req.params;
    let removed = data.filter(item => {
      if (+userId !== item.id ) {
        return item
      }
    })

    res.status(200).send(removed)
  }
}