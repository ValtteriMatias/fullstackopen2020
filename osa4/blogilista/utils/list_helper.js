/* eslint-disable no-unused-vars */
const dummy = (blogs) => {
  return 1
}


const totalLikes = (blogs) => {

  const reducer = (accumulator, currentValue) => accumulator + currentValue.likes
  return blogs.reduce(reducer, 0)

}


const favouriteBlog = (blogs) => {


  const maxi = blogs.map(x => x.likes).sort()[0]
  const top = blogs.find(x => x.likes === maxi)

  const json = {
    title: top.title,
    author: top.author,
    likes: top.likes
  }

  return json


}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}