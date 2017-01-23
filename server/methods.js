let fs = Npm.require('fs');
let path = Npm.require('path');

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
	},

	'properties.incViews' : function (id) {
		check(id, String);
		return Properties.update({_id: id}, {$inc : {views:1}});
	},

	'properties.addComment' : function (id, comment, dataUri, fileName) {
		check(id, String)
		check(comment, String);
			// fs.access('public/uploads', fs.R_OK | fs.W_OK, (err) => {
		  // 	console.log(err ? 'no access!' : 'can read/write');
			// });

			try { // instrucciones a probar
				console.log(dataUri);
				let buff = new Buffer(dataUri, 'base64');

				let stream = fs.createWriteStream(path.join(process.env.PWD, 'public/uploads', fileName));
				//let stream = fs.createWriteStream(path.join(process.cwd(), 'public/uploads', fileName));
  			stream.write(buff);
				stream.end();

		}
			catch (e) {
  		console.log(e);
		}

		var userEmail = Users.findOne({_id: this.userId}).emails[0].address;

		var doc = {
			propertyId: id,
			comment: comment,
			images: fileName,
			user: userEmail,
			createdAt: new Date()
		}
		return Comments.insert(doc);
	},

	'properties.addRemoveFav' : function (propertyId, userId) {
		check(userId, String);
		check(propertyId, String);
		var favorites = Users.findOne().favorites;
		if (favorites && favorites.length && favorites.indexOf(propertyId) !== -1){
			return Users.update({_id: userId}, {$pull : {favorites : propertyId}});
		} else {
			return Users.update({_id: userId}, {$addToSet : {favorites : propertyId}});
		}
	}

	// 'user.addRole' : function (user, role) {
	// 	var result = Roles.setUserRoles(user, ['admin']);
	// 	console.log(result);
	// 	return result;
	// }
})

// var cnx = DDP.connect('localhost:3000')
//cnx.call('tasks.all', (err, res)=>{console.log(res)})
// cnx.call('tasks.all',function(err, res){console.log(res)})
