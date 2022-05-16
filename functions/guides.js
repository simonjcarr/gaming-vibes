exports.handler = async (event, context) => {
  const guides = [
    { title: 'Beat all Zelda Bosses Like a Boss', author: 'mario'},
    { title: 'Mario Kark Shortcuts You Never New Existed', author: 'luigi'},
    { title: 'Ultimate Stree Figher Guide', author: 'peach'},
  ]

  if(context.clientContext.user) {
    return {
      statusCode: 200,
      body: JSON.stringify(guides)
    }
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized'})
    }
  }

}