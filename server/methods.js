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

	'properties.addComment' : function (id, commentToSend) {
		check(id, String)
		check(commentToSend.comment, String)

		// var dataUri = commentToSend.images;
		// var date = new Date();
		// var fileName = id + date.getDate() + date.getMonth() + date.getFullYear() + date.getHours() + date.getMinutes() + date.getMilliseconds() + ".jpg";
		// console.log(fs);
		// 	fs.access('public/uploads', fs.R_OK | fs.W_OK, (err) => {
		//   	console.log(err ? 'no access!' : 'can read/write');
		// 	});
		//
		// 	try { // instrucciones a probar
		// 		let buff = new Buffer(dataUri, 'base64');
		// 		let stream = fs.createWriteStream(path.join(process.cwd(), 'public/uploads', "1.jpg"));
  	// 		stream.write(buff);
		// 		stream.end();
		// }
		// 	catch (e) {
  	// 	console.log(e);
		// }
		//
		//
		 var images = [];

		var userEmail = Users.findOne({_id: this.userId}).emails[0].address;

		var doc = {
			propertyId: id,
			comment: commentToSend.comment,
			images: images,
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
