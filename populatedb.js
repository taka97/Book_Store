console.log('Importing models......')
const async = require('async')
const Book = require('./models/book')
const Author = require('./models/author')
const Genre = require('./models/genre')
const Publisher = require('./models/publisher')
const Account = require('./models/account')

console.log('Imported models')
console.log('Connecting db......')
var mongoose = require('mongoose')
var mongoDB = 'mongodb://admin:123456@ds231740.mlab.com:31740/book-store'
mongoose.connect(mongoDB)
mongoose.Promise = global.Promise
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

console.log('Connected db')
console.log('Gerenating data......')
var authors = []
var genres = []
var books = []
var publishers = []
var accounts = []

function accountCreate (email, password, avatarPath, name, birthDate, gender, address, typeAccount, cb) {
  var account = new Account({
    email: email,
    verifyEmail: true,
    password: password,
    avatarPath: avatarPath,
    name: name,
    birthDate: birthDate,
    gender: gender,
    address: address,
    typeAccount: typeAccount,
    isBlock: false
  })

  account.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }

    // console.log('New Account: ' + account)
    accounts.push(account)
    cb(null, account)
  })
}

function authorCreate (name, birthDay, gender, nationality, cb) {
  var author = new Author({ name: name, birthDate: birthDay, gender: gender, nationality: nationality })

  author.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    // console.log('New Author: ' + author)
    authors.push(author)
    cb(null, author)
  })
}

function genreCreate (name, cb) {
  var genre = new Genre({ name: name })

  genre.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    // console.log('New Genre: ' + genre)
    genres.push(genre)
    cb(null, genre)
  })
}

function publisherCreate (name, cb) {
  var publisher = new Publisher({ name: name })

  publisher.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    // console.log('New Genre: ' + publisher)
    publishers.push(publisher)
    cb(null, publisher)
  })
}

function bookCreate (title, author, publisher, publishDate, price, genre, imageCover, cb) {
  var book = new Book({
    title: title,
    author: author,
    publisher: publisher,
    publishDate: publishDate,
    price: price,
    genre: genre,
    imageCover: imageCover
  })
  book.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    // console.log('New Book: ' + book)
    books.push(book)
    cb(null, book)
  })
}

function createAcount (cb) {
  async.parallel([
    callback => {
      accountCreate('vanhoang0609@gmail.com', '123', '/images/user.png', 'Hồ Văn Hoàng', '1997/10/06', 'Nam', 'Bình Định', 'Admin', callback)
    },
    callback => {
      accountCreate('vosonhiepa@gmail.com', '123', '/images/user.png', 'Võ Sơn Hiệp', '1997/01/01', 'Nam', 'An Giang', 'Admin', callback)
    },
    callback => {
      accountCreate('vanhoang0609@gmail.com', '123', '/images/user.png', 'Đinh Xuân Hiệp', '1997/01/01', 'Nam', 'Đắk Lắk', 'Admin', callback)
    }
  ], cb)
}

function createGenreAuthors (cb) {
  async.parallel([
    callback => {
      authorCreate('Eiichiro Oda', '1973/06/06', 'Nam', 'English', callback)
    },
    callback => {
      authorCreate('Rosie Nguyễn', '1988/01/06', 'Nữ', 'Việt Nam', callback)
    },
    callback => {
      authorCreate('Robin Sharma', '1978/01/06', 'Nam', 'USA', callback)
    },
    callback => {
      authorCreate('Dale Carnegie', '1987/01/12', 'Nam', 'Đức', callback)
    },
    callback => {
      authorCreate('Camilo Cruz', '1987/01/12', 'Nam', 'Pháp', callback)
    },
    callback => {
      authorCreate('Tony Buối Sáng', '1987/01/12', 'Nam', 'Việt Nam', callback)
    },
    callback => {
      authorCreate('Dale Carnegie', '1989/01/12', 'Nữ', 'Nga', callback)
    },
    callback => {
      authorCreate('Trác Nhã', '1977/01/12', 'Nam', 'Việt Nam', callback)
    },
    callback => {
      authorCreate('Hector Malot', '1990/01/12', 'Nam', 'Anh', callback)
    },
    callback => {
      authorCreate('Shinkai Makoto', '1987/01/12', 'Nữ', 'Nhật Bản', callback)
    },
    callback => {
      authorCreate('David J.Pollay', '1987/01/11', 'Nam', 'Nhật Bản', callback)
    },
    callback => {
      authorCreate('Ngô Đức Hùng', '1987/02/17', 'Nữ', 'Việt Nam', callback)
    },
    callback => {
      authorCreate('Trần Thề San', '1987/05/24', 'Nữ', 'Việt Nam', callback)
    },
    callback => {
      authorCreate('Trần Nhật Hóa', '1982/01/12', 'Nam', 'Việt Nam', callback)
    },
    callback => {
      authorCreate('Luis Sepulveda', '1987/09/12', 'Nam', 'Anh', callback)
    },

    callback => {
      genreCreate('Văn học nước ngoài', callback)
    },
    callback => {
      genreCreate('Kỹ năng - sống đẹp', callback)
    },
    callback => {
      genreCreate('Tư duy - kỹ năng sống', callback)
    },
    callback => {
      genreCreate('Ký sự lập trình', callback)
    },
    callback => {
      genreCreate('Khoa học - kỹ thuật', callback)
    },
    callback => {
      genreCreate('Văn Học thiếu nhi', callback)
    },
    callback => {
      genreCreate('Văn Học Việt Nam', callback)
    },
    callback => {
      genreCreate('Kinh tế', callback)
    },
    callback => {
      publisherCreate('Văn Hoá Nghệ Thuật', callback)
    },
    callback => {
      publisherCreate('Hội Nhà Văn', callback)
    },
    callback => {
      publisherCreate('Thế Giới', callback)
    },
    callback => {
      publisherCreate('Tổng Hợp', callback)
    },
    callback => {
      publisherCreate('Trẻ', callback)
    },
    callback => {
      publisherCreate('Văn Học', callback)
    },
    callback => {
      publisherCreate('Khoa học & kỹ thuật', callback)
    },
    callback => {
      publisherCreate('Thanh niên', callback)
    },
    callback => {
      publisherCreate('Kim Đồng', callback)
    },
    callback => {
      publisherCreate('Phụ Nữ', callback)
    }
  ],
    // optional callback
  cb)
}

function createBooks (cb) {
  async.parallel([
    function (callback) {
      bookCreate('One Piece Vol.1 - Bản Limited kỉ niệm 10 năm', authors[0], publishers[0], '2017/5/17', '44000', genres[0], 'https://vcdn.tikicdn.com/cache/1200x1200/ts/product/d0/b0/76/b40b0181fc08fa785f784a508952b3ba.jpg', callback)
    },
    function (callback) {
      bookCreate('Tuổi trẻ đáng giá bao nhiêu?', authors[1], publishers[1], '2017/5/24', '50000', genres[1], 'https://vcdn.tikicdn.com/cache/550x550/media/catalog/product/t/u/tuoi-tre-dang-gia-bao-nhieu-u547-d20161012-t113832-888179.u3059.d20170616.t095744.390222.jpg', callback)
    },
    function (callback) {
      bookCreate('Đời ngắn đừng ngủ dài', authors[2], publishers[2], '2017/5/20', '70000', genres[2], 'https://vcdn.tikicdn.com/media/bookpreview/2a/ef/398558/files/OEBPS/Images/img254.gif', callback)
    },
    function (callback) {
      bookCreate('Đắc nhân tâm', authors[3], publishers[3], '2017/8/20', '40000', genres[3], 'https://vcdn.tikicdn.com/media/bookpreview/9c/c7/480040/files/OEBPS/Images/img592.gif', callback)
    },
    function (callback) {
      bookCreate('Ngày xưa có một con bò', authors[4], publishers[4], '2017/8/20', '52000', genres[2], 'https://vcdn.tikicdn.com/media/bookpreview/ad/e9/567066/files/OEBPS/Images/IMG_20170923_0098.gif', callback)
    },
    function (callback) {
      bookCreate('Cafe cùng Tony', authors[5], publishers[4], '2017/1/20', '52000', genres[5], 'https://vcdn.tikicdn.com/media/bookpreview/b7/ed/810227/files/OEBPS/Images/img281.gif', callback)
    },
    function (callback) {
      bookCreate('Quẳng gánh lo đi và vui sống', authors[1], publishers[3], '2017/1/20', '40000', genres[5], 'https://vcdn.tikicdn.com/media/bookpreview/eb/86/513788/files/OEBPS/Images/IMG_20170809_0001.gif', callback)
    },
    function (callback) {
      bookCreate('Mình nói gì khi nói về hạnh phúc', authors[3], publishers[1], '2017/1/20', '45000', genres[5], 'https://vcdn.tikicdn.com/media/bookpreview/df/83/1627925/files/OEBPS/Images/IMG_20180406_0001.gif', callback)
    },
    function (callback) {
      bookCreate('Khéo ăn nói sẽ có được thiên hạ', authors[5], publishers[1], '2017/1/20', '45000', genres[5], 'https://vcdn.tikicdn.com/media/bookpreview/7e/97/413656/files/OEBPS/Images/IMG_20170804_0040.gif', callback)
    },
    function (callback) {
      bookCreate('Không gia đình', authors[2], publishers[0], '2017/1/20', '45000', genres[3], 'https://vcdn.tikicdn.com/media/bookpreview/34/bb/1074094/files/OEBPS/Images/img348.gif', callback)
    },
    function (callback) {
      bookCreate('5 Centimet trên giây', authors[0], publishers[3], '2017/4/20', '45000', genres[2], 'https://vcdn.tikicdn.com/media/bookpreview/ff/06/418676/files/OEBPS/Images/img894.gif', callback)
    },
    function (callback) {
      bookCreate('Bài học diệu kỳ từ chiếc xe rác', authors[3], publishers[2], '2017/2/20', '45000', genres[1], 'https://vcdn.tikicdn.com/media/bookpreview/4f/4d/353337/files/OEBPS/Images/IMG_20170803_0001.gif', callback)
    },
    function (callback) {
      bookCreate('Để yên cho bác sẽ "Hiền"', authors[3], publishers[0], '2017/2/20', '45000', genres[1], 'https://vcdn.tikicdn.com/cache/w1200/ts/product/79/a5/d2/1c8953a4d605bfc15ba1138176c17135.jpg', callback)
    },
    function (callback) {
      bookCreate('Code dạo ký sự', authors[4], publishers[1], '2017/2/20', '45000', genres[1], 'https://vcdn.tikicdn.com/media/bookpreview/04/86/580509/files/OEBPS/Images/IMG_20170803_0001.gif', callback)
    },
    function (callback) {
      bookCreate('Kỹ thuật lập trình cơ sở với C/C++', authors[5], publishers[2], '2017/2/20', '55000', genres[1], 'https://vcdn.tikicdn.com/media/bookpreview/70/b5/723372/files/OEBPS/Images/img098.gif', callback)
    },
    function (callback) {
      bookCreate('Điều khiển Logic lập trình PLC', authors[1], publishers[5], '2017/2/20', '25000', genres[1], 'https://vcdn.tikicdn.com/media/bookpreview/82/da/592335/files/OEBPS/Images/img359.gif', callback)
    },
    function (callback) {
      bookCreate('Thiết kế mạch & lập trình PLC', authors[0], publishers[2], '2017/2/20', '15000', genres[1], 'https://vcdn.tikicdn.com/media/bookpreview/5e/ec/576266/files/OEBPS/Images/IMG_20171102_0622.gif', callback)
    },
    function (callback) {
      bookCreate('Giáo trình lập trình Windown', authors[2], publishers[3], '2017/2/20', '69000', genres[1], 'https://vcdn.tikicdn.com/media/bookpreview/22/5c/722034/files/OEBPS/Images/img024.gif', callback)
    },
    function (callback) {
      bookCreate('Giáo trình nhập môn trí tuệ nhân tạo', authors[3], publishers[1], '2017/2/20', '70000', genres[1], 'https://vcdn.tikicdn.com/media/bookpreview/8c/a4/643022/files/OEBPS/Images/img091.gif', callback)
    }
  ],
    // optional callback
  cb)
}

async.series([
  createAcount,
  createGenreAuthors,
  createBooks
],
  // Optional callback
function (err, results) {
  if (err) {
    console.log('FINAL ERR: ' + err)
  }
  console.log('Gerenated data completed')
  // All done, disconnect from database
  mongoose.connection.close()
})
