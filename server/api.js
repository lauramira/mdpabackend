var Api = new Restivus({
	useDefaultAuth: true
});

/* PROPERTY API */
Api.addRoute('properties', {authRequired: false}, {
  get: function () {
    var query = this.queryParams;
		if (query && query.matchSearch && query.type){
			var matchSearch = query.matchSearch;
			var type = query.type;
			var user = Users.findOne({_id:this.request.headers["x-user-id"]});
			if (user){
				
				return Properties.find({propertyType: type,
	          $or : [ {address: {$regex: matchSearch, $options: 'i'}},
	                  {zipcode: {$regex:  matchSearch, $options: 'i'}},
	                  {city: {$regex:  matchSearch , $options: 'i'}}]}
										//,{fields: {'name':1, 'address': 1,'price' : 1, 'images' : 1,'area' : 1}}
									).fetch();
			} else {
				return Properties.find({propertyType: type,
	          $or : [ {address: {$regex: matchSearch, $options: 'i'}},
	                  {zipcode: {$regex:  matchSearch, $options: 'i'}},
	                  {city: {$regex:  matchSearch , $options: 'i'}}]}
										,{fields: {'owner':0}}
									).fetch();
			}


		} else if(query && query.lat && query.lng && query.type){
				return Properties.aggregate(
	        [{
	          $geoNear: {
	             near: {
	                 type: "Point",
	                 coordinates: [ parseFloat(query.lat),  parseFloat(query.lng) ] },
	             distanceField: "distance",
	             maxDistance: 3000,
	             num: 15,
	             spherical: true
	          }
	        },
	        {
	            $match: {propertyType: query.type}
	        }])
		} else {
			return { statusCode: 400, body: {status: 'Bad Request', message: 'Bad Request'}}
		}
	}
});

Api.addRoute('properties/near/', {authRequired: false}, {
  get: function () {
    var query = this.queryParams;
		if (query && query.lat && query.lng && query.type){
			var latitude = query.lat;
			var longitude = query.lng;
			var type = query.type;
			return Properties.find({propertyType: type,
          $or : [ {address: {$regex: matchSearch, $options: 'i'}},
                  {zipcode: {$regex:  matchSearch, $options: 'i'}},
                  {city: {$regex:  matchSearch , $options: 'i'}}]},
          				{fields: {'name':1, 'address': 1,'price' : 1, 'images' : 1,
									'area' : 1}}).fetch();
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

Api.addRoute('propertyWithComments/:id', {
  get: function () {
    var id = this.urlParams.id;
		var user = Users.findOne({_id:this.request.headers["x-user-id"]});
		if (id){
			if (user){
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

Api.addRoute('property/incViews/:id', {authRequired: false}, {
  put: function () {
		var id = this.urlParams.id;

		if (id){
			if (Properties.update({_id: id}, {$inc : {views:1}})){
				return {status: 'success', data: {message: 'View added'}}
			} else {
				return {statusCode: 404, body: {status: 'fail', message: 'Error on add view'}}
			}
		}
	}
});

Api.addRoute('user/:id/favorites', {authRequired: true},{
  get: function () {
    var id = this.urlParams.id;
		if (id && this.userId == id){
			var favorites = Users.findOne(id).favorites;
			if (favorites){
				return Properties.find(
					{'_id' : { $in : favorites }},
					{fields: {'name':1, 'address': 1, 'price' : 1, 'images' : 1,
					'area': 1}}).fetch();
				}
			return {};
		} else {
			return { statusCode: 401, body: {status: 'Unauthorized', message: 'Unauthorized'}}
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


Api.addRoute('user/:id/modifyFavorites', {authRequired: true}, {
	put: function (){
		var id = this.urlParams.id;
		var user = Users.findOne({_id:this.request.headers["x-user-id"]});
		var propertyId = this.queryParams.propertyId;

		if (!user){
			return { statusCode: 401, body: {status: 'Unauthorized', message: 'Unauthorized'}}
		}
		if (id && propertyId){
			if (id === user._id){
				var favorites = user.favorites;
				if (favorites && favorites.length && favorites.indexOf(propertyId) !== -1){
					if (Users.update({_id: user._id}, {$pull : {favorites : propertyId}})){
						return {status: 'success', data: {message: 'Favorite updated'}}
					} else {
						return {statusCode: 404, body: {status: 'fail', message: 'Error on update favorite'}}
        	}
				} else {
					if (Users.update({_id: user._id}, {$addToSet : {favorites : propertyId}})){
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

/* COMMENT */
Api.addRoute('comment/byProperty/:id', {authRequired: false}, {
  get: function () {
    var propertyId = this.urlParams.id;
		if (propertyId){
			return Comments.find({propertyId: propertyId}, {fields: {'propertyId' : 0, '_id' : 0}}).fetch();
		} else {
			return { statusCode: 400, body: {status: 'Bad Request', message: 'Bad Request'}}
		}
	}
});

Api.addRoute('comment', {authRequired: true}, {
  post: function () {
    var comment = this.bodyParams;
		comment.createdAt = new Date();
		var user = Users.findOne({_id:this.request.headers["x-user-id"]});
		comment.user= user.emails[0].address
		if (comment){
			if (!comment.propertyId || !comment.comment){
				return { statusCode: 400, body: {status: 'Bad Request', message: 'Bad Request'}}
			} else {
				if (Comments.insert(comment)){
					return {status: 'success', data: {message: 'Comment added'}}
				} else {
					return {statusCode: 404, body: {status: 'fail', message: 'Error on add comment'}}
				}
			}
		} else {
			return { statusCode: 400, body: {status: 'Bad Request', message: 'Bad Request'}}
		}
	}
});
