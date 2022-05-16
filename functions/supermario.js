exports.handler = async function supermario(event, content) {
  console.log('function ran')

  const data = { name: 'mario', age: '32', job: 'plumber'}

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}