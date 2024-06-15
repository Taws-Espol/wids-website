const feed = new Instafeed({
  accessToken:
    "IGQWRNaXpCNE1MSVBnZA0pLNFVMSU9LQktEMlJEN3ZALVEE4R0ZAlWEVNcjV6b1dJLTE4MnZA5WnAxRGZAIcmM3NnhsejFuWDRpWHJUN2ljWHJBNUJJNnRpNGFRbjJmU2dqT19OQ2JkRGc0OEVMQQZDZD",
  limit: 3,
  template:
    '<a href="{{link}}" target="_blank" rel="noopener noreferrer"><img title="{{caption}}" src="{{image}}" /></a>',
});

feed.run();
