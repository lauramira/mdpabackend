var Api = new Restivus({
	userDefaultAuth: true,
	prettyJson: true
});

Api.addRoute('properties', {authRequired: false}, {
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
					return {
          	statusCode: 400,
          	body: {status: 'Bad Request', message: 'Bad Request'}
        	}
				}
			}

  });

	Api.addRoute('property/:id', {
	    get: function () {
	      var id = this.urlParams.id;
				var userId = this.userId;
				if (id){
					if (userId){
							return Properties.findOne(id);
					} else {
							return Properties.findOne({_id: id}, {fields: {'owner' : 0}});

					}

				} else {
					return {
          	statusCode: 400,
          	body: {status: 'Bad Request', message: 'Bad Request'}
        	}
				}


				}

	  });
