Meteor.methods({
	'properties.create' : function (data){
		if (this.userId){
			try {
				var datatosent = JSON.parse(data);
				return Properties.insert(datatosent);
			} catch(err){
				console.log(err);
				throw new Meteor.Error(err.error, err.message);
			}
		} else {
			throw new Meteor.Error(401, 'Access denied');
		}
	}
})

// var cnx = DDP.connect('localhost:3000')
//cnx.call('tasks.all', (err, res)=>{console.log(res)})
// cnx.call('tasks.all',function(err, res){console.log(res)})
