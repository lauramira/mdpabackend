var Api = new Restivus({
	useDefaultAuth: true
});

/* PROPERTY API */
Api.addRoute('property', {authRequired: false}, {
  get: function () {
    var query = this.queryParams;
		if (query && query.matchSearch && query.type){
			var matchSearch = query.matchSearch;
			var type = query.type;
			return Properties.find({type: type,
          $or : [ {address: {$regex: matchSearch, $options: 'i'}},
                  {zipcode: {$regex:  matchSearch, $options: 'i'}},
                  {city: {$regex:  matchSearch , $options: 'i'}}]},
          				{fields: {'name':1, 'address': 1, 'price' : 1, 'images' : 1}}).fetch();
		} else {
			return { statusCode: 400, body: {status: 'Bad Request', message: 'Bad Request'}}
		}
	}
});

Api.addRoute('property/:id', {authRequired: true}, {
  get: {
		authRequired: false,
    action: function () {
			var id = this.urlParams.id;
			var user = Users.findOne({_id:this.request.headers["x-user-id"]});
			if (id){
				if (user){
						return Properties.findOne(id);
				} else {
						return Properties.findOne({_id: id}, {fields: {'owner' : 0}});
				}
			} else {
					return { statusCode: 400, body: {status: 'Bad Request', message: 'Bad Request'}}
			}
		}
  }
});

Api.addRoute('property/incViews/:id', {authRequired: true}, {
  put: function () {
		var id = this.urlParams.id;
		if (!this.userId){
			return { statusCode: 401, body: {status: 'Unauthorized', message: 'Unauthorized'}}
		}
		if (id && this.userId){
			if (Properties.update({_id: id}, {$inc : {views:1}})){
				return {status: 'success', data: {message: 'View added'}}
			} else {
				return {statusCode: 404, body: {status: 'fail', message: 'Error on add view'}}
			}
		} else {
			return { statusCode: 401, body: {status: 'Unauthorized', message: 'Unauthorized'}}
		}
	}
});

Api.addRoute('propertyWithComments/:id', {
  get: function () {
    var id = this.urlParams.id;
		if (id){
			if (this.userId){
					var property = Properties.findOne(id);
			} else {
					var property = Properties.findOne({_id: id}, {fields: {'owner' : 0}});
			}
			property.comments = Comments.find({propertyId: id}, {fields: {'propertyId' : 0, '_id' : 0}}).fetch();
			return property;
		} else {
			return { statusCode: 400, body: {status: 'Bad Request', message: 'Bad Request'}
    	}
		}
	}
});

/* USER */
Api.addRoute('user/:id', {authRequired: true}, {
	get: function () {
		var id = this.urlParams.id;
		var userId = this.userId;
		if (!userId){
			return { statusCode: 401, body: {status: 'Unauthorized', message: 'Unauthorized'}}
		}
		if (id){
			if (id === userId){
				return Users.findOne({_id : id}, {fields: {'email': 1, 'favorites' : 1}});
			} else {
				return { statusCode: 403, body: {status: 'Forbidden', message: 'Forbidden'}}
			}
		} else {
			return { statusCode: 401, body: {status: 'Unauthorized', message: 'Unauthorized'}}
		}
	}
});


Api.addRoute('user/modifyFavorites/:id', {authRequired: true}, {
	put: function (){
		var id = this.urlParams.id;
		var propertyId = this.bodyParams.propertyId;
		var userId = this.userId;

		if (!userId){
			return { statusCode: 401, body: {status: 'Unauthorized', message: 'Unauthorized'}}
		}
		if (id && propertyId){
			if (id === userId){
				var favorites = Users.findOne({_id: userId}).favorites;
				if (favorites && favorites.length && favorites.indexOf(propertyId) !== -1){
					if (Users.update({_id: userId}, {$pull : {favorites : propertyId}})){
						return {status: 'success', data: {message: 'Favorite updated'}}
					} else {
						return {statusCode: 404, body: {status: 'fail', message: 'Error on update favorite'}}
        	}
				} else {
					if (Users.update({_id: userId}, {$addToSet : {favorites : propertyId}})){
						return {status: 'success', data: {message: 'Favorite updated'}}
					} else {
						return {statusCode: 404, body: {status: 'fail', message: 'Error on update favorite'}}
					}
				}
			} else {
				return { statusCode: 403, body: {status: 'Forbidden', message: 'Forbidden'}
				}
			}
		} else {
			return { statusCode: 401, body: {status: 'Unauthorized', message: 'Unauthorized'}
			}
		}
	}
});
