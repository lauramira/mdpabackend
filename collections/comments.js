Comments = new Meteor.Collection('comments');

Comments.allow({
	insert: function (){
		return true;
	}
});
