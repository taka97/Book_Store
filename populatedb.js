console.log('Importing models......')
const async = require('async')
const Book = require('./models/book')
const Author = require('./models/author')
const Genre = require('./models/genre')
const Publisher = require('./models/publisher')
const Account = require('./models/account')
const BookInstance = require('./models/bookInstance')

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
var bookInstances = []
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

function bookCreate (title, author, publisher, publishDate, price, genre, description, cb) {
  var book = new Book({
    title: title,
    author: author,
    publisher: publisher,
    publishDate: publishDate,
    price: price,
    genre: genre,
    description: description
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

function bookInstanceCreate (book, currentPrice, currentTotalQuantity, size, coverType, imageCover, status, cb) {
  var bookInstance = new BookInstance({
    book: book,
    currentPrice: currentPrice,
    currentTotalQuantity: currentTotalQuantity,
    size: size,
    coverType: coverType,
    imageCover: imageCover,
    status: status
  })
  bookInstance.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    // console.log('New Book Instance: ' + bookInstance)
    bookInstances.push(bookInstance)
    cb(null, bookInstance)
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
    // console.log('New publisher: ' + publisher)
    publishers.push(publisher)
    cb(null, publisher)
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

function createGenreAuthorsPublishers (cb) {
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
      bookCreate('One Piece - Tập 1 (Tái Bản 2015)', authors[0], publishers[0], '2017/5/17', '44000', genres[0], 'One Piece (Vua hải tặc) bộ thuộc thể loại truyện tranh Hành động kể về một cậu bé tên Monkey D. Luffy, giong buồm ra khơi trên chuyến hành trình tìm kho báu huyền thoại One Piece và trở thành Vua hải tặc. Để làm được điều này, cậu phải đến được tận cùng của vùng biển nguy hiểm và chết chóc nhất thế giới: Grand Line (Đại Hải Trình). Luffy đội trên đầu chiếc mũ rơm như một nhân chứng lịch sử vì chiếc mũ rơm đó đã từng thuộc về hải tặc hùng mạnh: Hải tặc vương Gol. D. Roger và tứ hoàng Shank "tóc đỏ". Luffy lãnh đạo nhóm hải tặc Mũ Rơm qua East Blue (Biển Đông) và rồi tiến đến Grand Line. Cậu theo dấu chân của vị vua hải tặc quá cố, Gol. D. Roger, chu du từ đảo này sang đảo khác để đến với kho báu vĩ đại.', callback)
    },
    function (callback) {
      bookCreate('Tuổi trẻ đáng giá bao nhiêu?', authors[1], publishers[1], '2017/5/24', '50000', genres[1], 'Bạn hối tiếc vì không nắm bắt lấy một cơ hội nào đó, chẳng có ai phải mất ngủ. Bạn trải qua những ngày tháng nhạt nhẽo với công việc bạn căm ghét, người ta chẳng hề bận lòng. Bạn có chết mòn nơi xó tường với những ước mơ dang dở, đó không phải là việc của họ. Suy cho cùng, quyết định là ở bạn. Muốn có điều gì hay không là tùy bạn.Nên hãy làm những điều bạn thích. Hãy đi theo tiếng nói trái tim. Hãy sống theo cách bạn cho là mình nên sống. Vì sau tất cả, chẳng ai quan tâm.', callback)
    },
    function (callback) {
      bookCreate('Đời ngắn đừng ngủ dài', authors[2], publishers[2], '2017/5/20', '70000', genres[2], 'Mọi lựa chọn đều giá trị. Mọi bước đi đều quan trọng. Cuộc sống vẫn diễn ra theo cách của nó, không phải theo cách của ta. Hãy kiên nhẫn. Tin tưởng. Hãy giống như người thợ cắt đá, đều đặn từng nhịp, ngày qua ngày. Cuối cùng, một nhát cắt duy nhất sẽ phá vỡ tảng đá và lộ ra viên kim cương. Người tràn đầy nhiệt huyết và tận tâm với việc mình làm không bao giờ bị chối bỏ. Sự thật là thế.', callback)
    },
    function (callback) {
      bookCreate('Đắc nhân tâm', authors[3], publishers[3], '2017/8/20', '40000', genres[3], 'Hiện nay có một sự hiểu nhầm đã xảy ra. Tuy Đắc Nhân Tâm là tựa sách hầu hết mọi người đều biết đến, vì những danh tiếng và mức độ phổ biến, nhưng một số người lại “ngại” đọc. Lý do vì họ tưởng đây là cuốn sách “dạy làm người” nên có tâm lý e ngại. Có lẽ là do khi giới thiệu về cuốn sách, người ta luôn gắn với miêu tả đây là “nghệ thuật đối nhân xử thế”, “nghệ thuật thu phục lòng người”… Những cụm từ này đã không còn hợp với hiện nay nữa, gây cảm giác xa lạ và không thực tế.', callback)
    },
    function (callback) {
      bookCreate('Ngày xưa có một con bò', authors[4], publishers[4], '2017/8/20', '52000', genres[2], 'Nhiều khi ta nghĩ ta đã làm tốt rồi, học giỏi rồi, xinh đẹp rồi nên cứ dựa vào thành quả đó để ỷ lại, không cố gắng nữa và sa vào bẫy hài lòng với suy nghĩ rằng mình ít nhất đang có cái gì đó: Một học sinh giỏi luôn ỷ lại rằng ta giỏi rồi, không cần cố gắng nữa; một cô giáo từ năm này qua năm khác không chịu thay đổi, cập nhật giáo án của mình vì cho rằng kiến thức trong giáo án đó đã quá chuẩn; cô gái luôn tự hào hớp hồn bạn trai mình ngay từ cái nhìn đầu tiên cứ tự tin rằng mình đủ hoàn hảo để bạn trai yêu mà không bao giờ muốn tự làm mới mình, một nhân viên tự cho rằng ta làm dự án vừa rồi quá thành công và sếp đã thấy được năng lực của ta rồi, ta không cần thể hiện nữa; một nhà văn viết được 1 cuốn sách best-sellers nhưng không chịu đổi mới ngòi bút vì cho rằng ta đã viết hay rồi, cuốn sách của ta được mọi người khen ngợi đó thôi…', callback)
    },
    function (callback) {
      bookCreate('Cafe cùng Tony', authors[5], publishers[4], '2017/1/20', '52000', genres[5], 'Có đôi khi vào những tháng năm bắt đầu vào đời, giữa vô vàn ngả rẽ và lời khuyên, khi rất nhiều dự định mà thiếu đôi phần định hướng, thì CẢM HỨNG là điều quan trọng để bạn trẻ bắt đầu bước chân đầu tiên trên con đường theo đuổi giấc mơ của mình. Cà Phê Cùng Tony là tập hợp những bài viết của tác giả Tony Buổi Sáng. Đúng như tên gọi, mỗi bài nhẹ nhàng như một tách cà phê, mà bạn trẻ có thể nhận ra một chút gì của chính mình hay bạn bè mình trong đó: Từ chuyện lớn như định vị bản thân giữa bạn bè quốc tế, cho đến chuyện nhỏ như nên chú ý những phép tắc xã giao thông thường.', callback)
    },
    function (callback) {
      bookCreate('Quẳng gánh lo đi và vui sống', authors[1], publishers[3], '2017/1/20', '40000', genres[5], 'Cuốn sách sẽ mang đến cho bạn những lời khuyên về việc làm thế nào để giảm thiểu lo lắng như: chia sẻ nó với người khác, tìm cách giải quyết vấn đề, quên tất cả những điều lo lắng nằm ngoài tầm tay… đề cập đến áp lực trong cuộc sống và làm thế nào để chúng ta quên đi những áp lực đó và tận hưởng một cuộc sống không áp lực.', callback)
    },
    function (callback) {
      bookCreate('Mình nói gì khi nói về hạnh phúc', authors[3], publishers[1], '2017/1/20', '45000', genres[5], 'Hạnh phúc khi thấy mình được sinh ra. Được trải qua tất cả những vui buồn sướng khổ. Được tư duy và chiêm nghiệm. Ngẫm ra, được làm người đã là hạnh phúc lắm rồi, có cần điều gì khác nữa đâu. Một năm sau thành công của Bestseller Tuổi trẻ đáng giá bao nhiêu?, được đông đảo bạn trẻ khắp nơi nồng nhiệt đón nhận, tác giả Rosie Nguyễn một lần nữa trở lại với tập sách thứ ba khai thác những khía cạnh khác nhau của hạnh phúc, thông qua những câu chuyện gần gũi, cảm động của chính bản thân cô. Tháng Ba năm 2018, trong dịp Hội sách TP.HCM lần X - Công ty Cổ phần Văn hóa và Truyền thông Nhã Nam trân trọng ra mắt cuốn sách Mình nói gì khi nói về hạnh phúc? của tác giả Rosie Nguyễn, như một món quà gửi đến tất cả những ai đang bâng khuâng trên con đường đi tìm ý nghĩa của hạnh phúc.', callback)
    },
    function (callback) {
      bookCreate('Khéo ăn nói sẽ có được thiên hạ', authors[5], publishers[1], '2017/1/20', '45000', genres[5], 'Xã hội hiện đại, từ xin việc đến thăng chức, từ tình yêu đến hôn nhân, từ giao lưu đến hợp tác… không việc gì không cần tài ăn nói. Xã hội hiện đại, từ xin việc đến thăng chức, từ tình yêu đến hôn nhân, từ giao lưu đến hợp tác… không việc gì không cần tài ăn nói. Làm thế nào để nói năng trôi chảy? Làm thế nào để nói lời “đi vào lòng người”? Trong những dịp khác nhau, với những người khác nhau, ở những tình huống không giống nhau… có cuốn sách này gợi ý, bạn sẽ thành người khéo ăn nói.', callback)
    },
    function (callback) {
      bookCreate('Không gia đình', authors[2], publishers[0], '2017/1/20', '45000', genres[3], 'Không Gia Đình là tiểu thuyết nổi tiếng nhất trong sự nghiệp văn chương của Hector Malot. Hơn một trăm năm nay, tác phẩm giành giải thưởng của Viện Hàn Lâm Văn học Pháp này đã trở thành người bạn thân thiết của thiếu nhi và tất cả những người yêu mến trẻ khắp thế giới. Không Gia Đình kể về chuyện đời Rémi, một cậu bé không cha mẹ, họ hàng thân thích. Sau khi phải rời khỏi vòng tay của người má nuôi, em đã đi theo đoàn xiếc thú của cụ già Vitalis tốt bụng. Kể từ đó, em lưu lạc khắp nơi, ban đầu dưới sự che chở của cụ Vitalis, sau đó thì tự lập và còn lo cả công việc biểu diễn và sinh sống cho cả một gánh hát rong. Đã có lúc em và cả đoàn lang thang cả mấy ngày đói khát rồi còn suýt chết rét. Có bận em bị lụt ngầm chôn trong giếng mỏ hàng tuần. Rồi có lần em còn mắc oan  bị giải ra tòa và phải ở tù. Nhưng cũng có khi em được nuôi nấng đàng hoàng, no ấm. Song dù trong hoàn cảnh nào, Rémi vẫn giữ được sự gan dạ, ngay thẳng, lòng tự trọng, tính thương người, ham lao động chứ không hạ mình hay gian dối. Cuối cùng, sau bao gian nan khổ cực, em đã đoàn tụ được với gia đình của mình. Tác phẩm đã ca ngợi sự lao động bền bỉ, tinh thần tự lập, chịu đựng gian khó, khích lệ tình bạn chân chính. Ca ngợi lòng nhân ái, tình yêu cuộc sống, ý chí vươn lên không ngừng…Không Gia Đình vì thế đã vượt qua biên giới nước Pháp và tồn tại lâu dài với thời gian.', callback)
    },
    function (callback) {
      bookCreate('5 Centimet trên giây', authors[0], publishers[3], '2017/4/20', '45000', genres[2], '5cm/s không chỉ là vận tốc của những cánh anh đào rơi, mà còn là vận tốc khi chúng ta lặng lẽ bước qua đời nhau, đánh mất bao cảm xúc thiết tha nhất của tình yêu. Bằng giọng văn tinh tế, truyền cảm, 5 centimet trên giây mang đến những khắc họa mới về tâm hồn và khả năng tồn tại của cảm xúc, bắt đầu từ tình yêu trong sáng, ngọt ngào của một cô bé và cậu bé. Ba giai đoạn, ba mảnh ghép, ba ngôi kể chuyện khác nhau nhưng đều xoay quanh nhân vật nam chính, người luôn bị ám ảnh bởi kí ức và những điều đã qua… Khác với những câu chuyện cuốn bạn chạy một mạch, truyện này khó mà đọc nhanh. Ngón tay bạn hẳn sẽ ngừng lại cả trăm lần trên mỗi trang sách. Chỉ vì một cử động rất khẽ, một câu thoại, hay một xúc cảm bất chợt có thể sẽ đánh thức những điều tưởng chừng đã ngủ quên trong tiềm thức, như ngọn đèn vừa được bật sáng trong tâm trí bạn. Và rồi có lúc nó vượt quá giới hạn chịu đựng, bạn quyết định gấp cuốn sách lại chỉ để tận hưởng chút ánh sáng từ ngọn đèn, hay đơn giản là để vết thương trong lòng mình có thời gian tự tìm xoa dịu.', callback)
    },
    function (callback) {
      bookCreate('Điều Kỳ Diệu Của Tiệm Tạp Hóa', authors[3], publishers[2], '2017/2/20', '45000', genres[1], 'Một đêm vội vã lẩn trốn sau phi vụ khoắng đồ nhà người, Atsuya, Shota và Kouhei đã rẽ vào lánh tạm trong một căn nhà hoang bên con dốc vắng người qua lại. Căn nhà có vẻ khi xưa là một tiệm tạp hóa với biển hiệu cũ kỹ bám đầy bồ hóng, khiến người ta khó lòng đọc được trên đó viết gì. Định bụng nghỉ tạm một đêm rồi sáng hôm sau chuồn sớm, cả ba không ngờ chờ đợi cả bọn sẽ là một đêm không ngủ, với bao điều kỳ bí bắt đầu từ một phong thư bất ngờ gửi đến…', callback)
    },
    function (callback) {
      bookCreate('Để yên cho bác sĩ "Hiền"', authors[3], publishers[0], '2017/2/20', '45000', genres[1], 'Hắn tuổi GÀ, người bé như con CHUỘT. Suốt ngày hùng hục như TRÂU. Chạy loăng quăng khắp nơi như con NGỰA. Thế mà vẫn bị mắng mỏ như một con CHÓ. Cái loại tưng tửng sống không uốn éo được như RẮN, lủi thủi làm việc. Đồng nghiệp bảo đồ MÈO đội lốt HỔ, tinh tướng nói như RỒNG leo rồi làm culi bán sức. Thế nên mặt hắn lúc nào cũng nhăn như con KHỈ.', callback)
    },
    function (callback) {
      bookCreate('Code dạo ký sự', authors[4], publishers[1], '2017/2/20', '45000', genres[1], 'Nếu các bạn có đọc các blog về lập trình ở Việt Nam thì có lẽ cái tên Tôi đi code dạo không có gì quá xa lạ đối với các bạn. Về tác giả của blog Tôi đi code dạo, anh tên thật là Phạm Huy Hoàng, một Developer Full Stack, cựu sinh viên trường FPT University, hiện tại anh đang học Thạc sĩ Computer Science tại Đại học Lancaster ở Anh (học bổng $18000). Trước khi qua Xứ Sở Sương Mù, anh đã từng làm việc tại FPT Software và ASWIG Solutions. Với mong muốn chia sẻ kinh nghiệm học lập trình và các kỹ năng mà anh đã trải qua trong suốt quá trình học và làm việc với tư cách là người đi trước cũng như là một Developer Full Stack, nên anh đã quyết định xuất bản sách “Code dạo ký sự – lập trình viên đâu phải chỉ biết code', callback)
    },
    function (callback) {
      bookCreate('Kỹ thuật lập trình cơ sở với C/C++', authors[5], publishers[2], '2017/2/20', '55000', genres[1], 'Để đáp ứng nhu cầu đào tạo kỹ sư tin học của các ngành Công nghệ thông tin và Tin học trong các trường đại học, tăng cường thêm một lựa chọn cho người học tiếp cận đa dạng những vấn đề cơ sở của ngành, chúng tôi biên soạn cuốn sách “Kỹ thuật lập trình cơ sở với ngôn ngữ C/C++', callback)
    },
    function (callback) {
      bookCreate('Điều khiển Logic lập trình PLC', authors[1], publishers[5], '2017/2/20', '25000', genres[1], 'Tiến bộ công nghệ trong những năm gần đây đã dẫn đến sự phát triển thiết bị điều khiến logic lập trình (PLC), và tạo ra một cuộc cách mạng trong lĩnh vực kĩ thuật điều khiến. Trong xu thế đó , cuốn “Điều Khiển Logic Lập Trình PLC” được biên dịch nhằm giới thiệu PLC và hỗ trợ các kỹ sư lần đầu tiên tiếp xúc với PLC, sinh viên, kỹ thuật viên và các nhà quản lý, cung cấp giáo trình cơ bản về lập trình PLC.', callback)
    },
    function (callback) {
      bookCreate('Thiết kế mạch & lập trình PLC', authors[0], publishers[2], '2017/2/20', '15000', genres[1], 'PHẦN I. ĐIỀU KHIỂN ĐỘNG CƠ BẰNG CƠ ĐIỆN TỬ Bài tập 1.0: Các mạch dừng - khởi động Bài tập 2.0: Các mạch chạy - dừng theo chu kỳ Bài tập 3.0: Mạch thuận/đảo Bài tập 4.0: Các mạch thời chuẩn Bài tập 5.0: Hệ thống truyền động AC PHẦN II. LẬP TRÌNH Bài tập 6.0: STOP - START (PLC) Bài tập 7.0: Chạy và chạy dừng Bài tập 8.0: Băng tải bao Bài tập 9.0: Thuận đảo (TOF) Bài tập 10.0: Bộ đếm thuận/ngược Bài tập 11.0: Thuận/Đảo (theo thứ tự) Bài tập 12.0: Chu kỳ ép Bài tập 13.0: Thumbwheel Bài tập 14.0: Động cơ đa tốc độ.', callback)
    },
    function (callback) {
      bookCreate('Giáo trình lập trình Windown', authors[2], publishers[3], '2017/2/20', '69000', genres[1], 'Từ khi ra đời cho đến nay, Microsofts Windows dần chiếm được ưu thế trên thị trường và đã trở thành hệ điều hành phổ biến nhất cho máy tính cá nhân. Sự phổ biến đó kéo theo nhu cầu cần thiết của việc lạp trình ứng dụng trên môi trường này. Qua một thời gian nghiên cứu cũng như tham khảo tài liệu và ý kiến của bạn bè, đồng nghiệp, chúng tôi biên soạn cuốn giáo trình Lập trình trên môi trường Windows nhầm trang bị cho sinh viên chuyên ngành công nghệ thông tin những kiến thức cơ bản nhất về hệ điều hành Windows dưới góc độ lập trình viên. Ngoài ra, những bạn đọc yêu thích lập trình ứng dụng trên Windows cũng có thể tìm hiểu thêm kỹ thuật lập trình hướng đối tượng và khả năng biên dịch ưu việt của môi trường lập trình Visual C++ với bộ thư viện MFC qua giáo trình này', callback)
    },
    function (callback) {
      bookCreate('Giáo trình nhập môn trí tuệ nhân tạo', authors[3], publishers[1], '2017/2/20', '70000', genres[1], 'Giáo Trình Nhập Môn Trí Tuệ Nhân Tạo được biên soạn từ kinh nghiệm giảng dạy học phần Nhập Môn Trí Tuệ Nhân Tạo của tác giả tại Học viện Công nghệ Bưu chính Viễn thông, trên cơ sở tiếp thu phản hồi từ đồng nghiệp và sinh viên. Cuốn sách có thể sử dụng làm tài liệu học tập cho sinh viên đại học ngành công nghệ thông tin và các ngành liên quan, ngoài ra có thể sử dụng với mục đích tham khảo cho những người quan tâm tới trí tuệ nhân tạo.', callback)
    }
  ],
    // optional callback
  cb)
}

function createBookInstants (cb) {
  async.parallel([
    function (callback) {
      bookInstanceCreate(books[0], '17500', 5, [15, 21], 'Bìa mềm', ['https://vcdn.tikicdn.com/cache/1200x1200/ts/product/d0/b0/76/b40b0181fc08fa785f784a508952b3ba.jpg', 'https://vcdn.tikicdn.com/media/bookpreview/b2/63/449339/files/OEBPS/Images/img067.gif'], 'Còn hàng', callback)
    },
    function (callback) {
      bookInstanceCreate(books[1], '44000', 3, [15, 21], 'Bìa cứng', ['https://vcdn.tikicdn.com/cache/550x550/media/catalog/product/t/u/tuoi-tre-dang-gia-bao-nhieu-u547-d20161012-t113832-888179.u3059.d20170616.t095744.390222.jpg', 'https://vcdn.tikicdn.com/media/bookpreview/3d/06/551563/files/OEBPS/Images/img896.gif'], 'Còn hàng', callback)
    },
    function (callback) {
      bookInstanceCreate(books[2], '35000', 5, [15, 21], 'Bìa mềm', ['https://vcdn.tikicdn.com/media/bookpreview/2a/ef/398558/files/OEBPS/Images/img254.gif', 'https://vcdn.tikicdn.com/media/bookpreview/2a/ef/398558/files/OEBPS/Images/img255.gif'], 'Còn hàng', callback)
    },
    function (callback) {
      bookInstanceCreate(books[3], '31000', 4, [15, 20], 'Bìa mềm', ['https://vcdn.tikicdn.com/media/bookpreview/9c/c7/480040/files/OEBPS/Images/img592.gif', 'https://vcdn.tikicdn.com/media/bookpreview/9c/c7/480040/files/OEBPS/Images/img593.gif'], 'Hết hàng', callback)
    },
    function (callback) {
      bookInstanceCreate(books[4], '40000', 5, [15, 21], 'Bìa mềm', ['https://vcdn.tikicdn.com/media/bookpreview/ad/e9/567066/files/OEBPS/Images/IMG_20170923_0098.gif', 'https://vcdn.tikicdn.com/media/bookpreview/ad/e9/567066/files/OEBPS/Images/IMG_20170923_0099.gif'], 'Còn hàng', callback)
    },
    function (callback) {
      bookInstanceCreate(books[5], '50000', 5, [15, 21], 'Bìa cứng', ['https://vcdn.tikicdn.com/media/bookpreview/b7/ed/810227/files/OEBPS/Images/img281.gif', 'https://vcdn.tikicdn.com/media/bookpreview/b7/ed/810227/files/OEBPS/Images/img282.gif'], 'Còn hàng', callback)
    },
    function (callback) {
      bookInstanceCreate(books[6], '65000', 5, [15, 19], 'Bìa cứng', ['https://vcdn.tikicdn.com/cache/550x550/ts/product/00/e2/54/0129da67c6f845afa99f05fcf77e6952.jpg', 'https://vcdn.tikicdn.com/media/bookpreview/d0/c6/601553/files/OEBPS/Images/img043.gif'], 'Hết hàng', callback)
    },
    function (callback) {
      bookInstanceCreate(books[7], '45500', 5, [15, 20], 'Bìa mềm', ['https://vcdn.tikicdn.com/cache/550x550/ts/product/5a/63/29/c805950c434394a8f9df3223af604e40.jpg', 'https://vcdn.tikicdn.com/media/bookpreview/df/83/1627925/files/OEBPS/Images/img694.gif'], 'Còn hàng', callback)
    },
    function (callback) {
      bookInstanceCreate(books[8], '24500', 3, [15, 21], 'Bìa mềm', ['https://vcdn.tikicdn.com/media/bookpreview/7e/97/413656/files/OEBPS/Images/IMG_20170804_0040.gif', 'https://vcdn.tikicdn.com/media/bookpreview/7e/97/413656/files/OEBPS/Images/IMG_20170804_0041.gif'], 'Còn hàng', callback)
    },
    function (callback) {
      bookInstanceCreate(books[9], '20000', 5, [15, 21], 'Bìa mềm', ['https://vcdn.tikicdn.com/media/bookpreview/34/bb/1074094/files/OEBPS/Images/img348.gif', 'https://vcdn.tikicdn.com/media/bookpreview/34/bb/1074094/files/OEBPS/Images/img349.gif'], 'Còn hàng', callback)
    },
    function (callback) {
      bookInstanceCreate(books[10], '42700', 5, [15, 21], 'Bìa cứng', ['https://vcdn.tikicdn.com/media/bookpreview/ff/06/418676/files/OEBPS/Images/img894.gif', 'https://vcdn.tikicdn.com/media/bookpreview/ff/06/418676/files/OEBPS/Images/img895.gif'], 'Hết hàng', callback)
    },
    function (callback) {
      bookInstanceCreate(books[11], '86000', 5, [15, 21], 'Bìa cứng', ['https://vcdn.tikicdn.com/media/bookpreview/f0/d2/532016/files/OEBPS/Images/img019.jpg', 'https://vcdn.tikicdn.com/media/bookpreview/f0/d2/532016/files/OEBPS/Images/img020.jpg'], 'Còn hàng', callback)
    },
    function (callback) {
      bookInstanceCreate(books[12], '55000', 5, [15, 21], 'Bìa cứng', ['https://vcdn.tikicdn.com/cache/w1200/ts/product/79/a5/d2/1c8953a4d605bfc15ba1138176c17135.jpg', 'https://vcdn.tikicdn.com/media/bookpreview/2c/15/1715891/files/OEBPS/Images/IMG_20180529_0002.gif'], 'Còn hàng', callback)
    },
    function (callback) {
      bookInstanceCreate(books[13], '34500', 3, [15, 21], 'Bìa mềm', ['https://vcdn.tikicdn.com/media/bookpreview/04/86/580509/files/OEBPS/Images/IMG_20170803_0001.gif', 'https://vcdn.tikicdn.com/media/bookpreview/04/86/580509/files/OEBPS/Images/IMG_20170803_0002.gif'], 'Còn hàng', callback)
    },
    function (callback) {
      bookInstanceCreate(books[14], '41400', 5, [15, 20], 'Bìa cứng', ['https://vcdn.tikicdn.com/media/bookpreview/70/b5/723372/files/OEBPS/Images/img098.gif', 'https://vcdn.tikicdn.com/media/bookpreview/70/b5/723372/files/OEBPS/Images/img099.gif'], 'Hết hàng', callback)
    },
    function (callback) {
      bookInstanceCreate(books[15], '40500', 5, [15, 21], 'Bìa cứng', ['https://vcdn.tikicdn.com/media/bookpreview/82/da/592335/files/OEBPS/Images/img359.gif', 'https://vcdn.tikicdn.com/media/bookpreview/82/da/592335/files/OEBPS/Images/img360.gif'], 'Còn hàng', callback)
    },
    function (callback) {
      bookInstanceCreate(books[16], '76000', 5, [15, 21], 'Bìa cứng', ['https://vcdn.tikicdn.com/media/bookpreview/5e/ec/576266/files/OEBPS/Images/IMG_20171102_0622.gif', 'https://vcdn.tikicdn.com/media/bookpreview/5e/ec/576266/files/OEBPS/Images/IMG_20171102_0623.gif'], 'Hết hàng', callback)
    },
    function (callback) {
      bookInstanceCreate(books[17], '40000', 5, [15, 21], 'Bìa mềm', ['https://vcdn.tikicdn.com/media/bookpreview/22/5c/722034/files/OEBPS/Images/img024.gif', 'https://vcdn.tikicdn.com/media/bookpreview/22/5c/722034/files/OEBPS/Images/img025.gif'], 'Còn hàng', callback)
    },
    function (callback) {
      bookInstanceCreate(books[18], '85500', 5, [15, 21], 'Bìa cứng', ['https://vcdn.tikicdn.com/media/bookpreview/8c/a4/643022/files/OEBPS/Images/img091.gif', 'https://vcdn.tikicdn.com/media/bookpreview/8c/a4/643022/files/OEBPS/Images/img092.gif'], 'Còn hàng', callback)
    }
  ],
    // optional callback
  cb)
}

async.series([
  // createAcount,
  createGenreAuthorsPublishers,
  createBooks,
  createBookInstants
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
