"use strict";
const logout = new LogoutButton();

logout.action = () => {
    ApiConnector.logout(response => {
        response.success ? location.reload() : console.error("Все пропало!");
    });
};

ApiConnector.current(response => {
    response.success ? ProfileWidget.showProfile(response.data) : console.error("Все пропало!");
});

const rates = new RatesBoard();

function getCurrentCourse (){
    ApiConnector.getStocks(response => {
        if (response){
            rates.clearTable();
            rates.fillTable(response.data);

        }
    });
}
getCurrentCourse();

setInterval (getCurrentCourse, 60000);

const money = new MoneyManager();

money.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        response.success ? (ProfileWidget.showProfile(response.data), money.setMessage(!response.success, "Ура!"))  : money.setMessage(!response.success, response.data); //! меняем цвет окошка при успехе на зеленый

    });
}

money.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        response.success ? (ProfileWidget.showProfile(response.data), money.setMessage(!response.success, "Ура!"))  : money.setMessage(!response.success, response.data); //! меняем цвет окошка при успехе на зеленый

    });
}

money.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        response.success ? (ProfileWidget.showProfile(response.data), money.setMessage(!response.success, "Ура!"))  : money.setMessage(!response.success, response.data); //! меняем цвет окошка при успехе на зеленый
    });
}

const favorites = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success) {
        favorites.clearTable();
        favorites.fillTable(response.data);
        money.updateUsersList(response.data);
    }
});
  
favorites.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favorites.clearTable();
            favorites.fillTable(response.data);
            money.updateUsersList(response.data);
            favorites.setMessage(response.data = "Ура! У Вас появился новый друг!"); //по другому не придумал как, иначе [object Object]
        }
        favorites.setMessage(!response.success, response.data);
    })
};
  
favorites.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
          favorites.clearTable();
          favorites.fillTable(response.data);
          money.updateUsersList(response.data);
          favorites.setMessage(response.data = "Пользователь успешно удален!");  //по другому не придумал как, иначе [object Object]
        }
        favorites.setMessage(!response.success, response.data);
    })
}







