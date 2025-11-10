// Chatbot Logic - Xử lý câu hỏi và tư vấn concept

// Danh mục câu hỏi về kiến thức
export const knowledgeQuestions = {
  Q1: {
    question: "Thiện Duyên là ai?",
    answer: "Thiện Duyên là một thương hiệu chuyên tổ chức Lễ Hằng Thuận – nghi lễ cưới Phật giáo thiêng liêng dành cho các cặp đôi mong muốn một lễ cưới ý nghĩa, giản dị và đầy cảm xúc. Chúng tôi giúp bạn chuẩn bị trọn vẹn từ nghi lễ, không gian, kịch bản, đến cảm xúc, để mỗi buổi lễ trở thành một dấu ấn tâm linh khó quên. 🌿"
  },
  Q2: {
    question: "Ý nghĩa của tên \"Thiện Duyên\" là gì?",
    answer: "\"Thiện Duyên\" nghĩa là duyên lành, là cuộc gặp gỡ giữa hai tâm hồn đồng điệu, kết nối bởi sự hiểu và thương. Đó cũng là tinh thần mà chúng tôi gửi gắm trong mỗi buổi lễ — nhẹ nhàng, sâu sắc, và đầy nhân duyên. 💛"
  },
  Q3: {
    question: "Lễ Hằng Thuận là gì vậy ạ?",
    answer: "Lễ Hằng Thuận là một nghi lễ cưới Phật giáo được cử hành tại chùa, dưới sự chứng minh của chư Tăng. Buổi lễ giúp đôi bạn trẻ hiểu sâu hơn về ý nghĩa của hôn nhân, bắt đầu đời sống vợ chồng trong tinh thần hòa hợp, yêu thương và hướng thiện. 🪷"
  },
  Q4: {
    question: "Lễ Hằng Thuận có khác gì với lễ cưới thông thường không?",
    answer: "Có. Nếu lễ cưới thông thường chú trọng hình thức, thì Lễ Hằng Thuận đi sâu vào ý nghĩa tâm linh – giúp đôi bạn nhận thức về trách nhiệm, lòng biết ơn, và nhân duyên. Không ồn ào, mà ấm áp và tĩnh lặng. 🌸"
  },
  Q5: {
    question: "Thiện Duyên có những hình thức tổ chức nào?",
    answer: "Chúng tôi hiện có hai hình thức:\n\n• Lễ Hằng Thuận tại chùa: theo nghi thức truyền thống, giản dị, trang nghiêm.\n• Lễ Hằng Thuận tại resort hoặc không gian ngoài trời: kết hợp tinh thần Phật giáo với phong cách hiện đại, gần gũi với thiên nhiên. 🌿"
  },
  Q6: {
    question: "Thiện Duyên có nhận tổ chức lễ cưới ngoài Hà Nội không?",
    answer: "Có ạ 🌿 Thiện Duyên nhận tổ chức tại nhiều tỉnh thành – đặc biệt là các khu resort, không gian tâm linh hoặc retreat venue. Mỗi địa điểm đều được chọn lọc kỹ để giữ được sự tĩnh tại và thiêng liêng cho buổi lễ."
  },
  Q7: {
    question: "Tôi có thể yêu cầu một lễ cưới riêng tư, ít người tham dự không?",
    answer: "Dĩ nhiên rồi ạ. Nhiều cặp đôi chọn lễ Hằng Thuận mini (intimate) với chỉ gia đình và bạn thân, để buổi lễ thật an nhiên, trọn vẹn cảm xúc. 💛"
  },
  Q8: {
    question: "Chi phí tổ chức một Lễ Hằng Thuận là bao nhiêu?",
    answer: "Chi phí tùy thuộc vào địa điểm, quy mô, và các dịch vụ đi kèm. Hiện Thiện Duyên có 3 gói chính: Basic – Delux – Premium, với mức giá linh hoạt. Bạn có thể xem chi tiết tại trang Bảng giá hoặc gửi thông tin để chúng tôi tư vấn phù hợp. 🌸"
  },
  Q9: {
    question: "Quy trình đặt lễ như thế nào?",
    answer: "Quy trình gồm 4 bước:\n\n1. Đăng ký tư vấn trên website hoặc chat với chúng tôi.\n2. Chọn hình thức lễ & địa điểm.\n3. Thiết kế nghi lễ và trang trí riêng cho bạn.\n4. Tổ chức – ghi hình – bàn giao kỷ niệm.\n\nTất cả đều được Thiện Duyên đồng hành tận tâm từ đầu đến cuối. 🌿"
  },
  Q10: {
    question: "Khi làm Lễ Hằng Thuận cần chuẩn bị gì?",
    answer: "Bạn chỉ cần chuẩn bị tâm thành và nụ cười 😊. Mọi phần nghi thức, lễ vật, trang trí, MC, âm nhạc... đều do Thiện Duyên sắp xếp. Trước lễ, đội ngũ sẽ hướng dẫn cụ thể để bạn yên tâm."
  },
  Q11: {
    question: "Trang phục trong lễ có bắt buộc là áo dài truyền thống không?",
    answer: "Không bắt buộc, nhưng Thiện Duyên khuyến khích trang phục giản dị, thanh lịch, phù hợp không gian Phật giáo. Áo dài, váy nhẹ hoặc vest tone nhã là lựa chọn đẹp và trang nghiêm nhất. 🌸"
  },
  Q12: {
    question: "Ai sẽ chủ trì buổi lễ Hằng Thuận?",
    answer: "Buổi lễ được chứng minh bởi chư Tăng hoặc sư thầy tại chùa hoặc do Thiện Duyên kết nối. Mỗi vị đều được chọn lựa kỹ, đảm bảo đúng nghi lễ và tinh thần Phật giáo. 🪷"
  },
  Q13: {
    question: "Lễ có thể mời người thân phát biểu hoặc dâng lời chúc không?",
    answer: "Dạ có ạ. Thiện Duyên thường lồng ghép phần chia sẻ hoặc lời chúc để buổi lễ thêm ấm áp và cá nhân hóa cho từng đôi. 💛"
  },
  Q14: {
    question: "Thiện Duyên có quay phim, chụp ảnh không?",
    answer: "Có. Mỗi buổi lễ đều có ekip riêng của Thiện Duyên – ghi lại khoảnh khắc bằng ống kính tĩnh lặng, cảm xúc và tinh tế, phù hợp với tinh thần Phật giáo. 📸"
  },
  Q15: {
    question: "Sau lễ có được nhận video không?",
    answer: "Có ạ 🎞️. Bạn sẽ nhận bản video đầy đủ và highlight, được biên tập nhẹ nhàng với nhạc nền thiền định, để lưu giữ trọn vẹn cảm xúc."
  },
  Q16: {
    question: "Tôi muốn tư vấn trực tiếp thì làm sao?",
    answer: "Bạn có thể chat ngay tại đây, hoặc để lại thông tin tại trang Liên hệ. Đội ngũ Thiện Duyên sẽ liên hệ nhẹ nhàng, không làm phiền, để hiểu mong muốn của bạn trước khi tư vấn. 🌿"
  },
  Q17: {
    question: "Tôi chưa biết có nên làm lễ Hằng Thuận hay không…",
    answer: "Không sao cả 💛 Thiện Duyên luôn sẵn lòng lắng nghe. Bạn có thể bắt đầu bằng một buổi tư vấn chia sẻ về ý nghĩa lễ cưới tâm linh – để hiểu, cảm, rồi mới chọn."
  }
};

// Hệ thống tính điểm cho concept
export const conceptScoring = {
  // Nhóm Chùa
  chua: {
    'Truyền thống': 0,
    'Thiền': 0,
    'Sen': 0
  },
  // Nhóm Resort
  resort: {
    'Modern Zen': 0,
    'Elegant Contemporary': 0,
    'Nature Fusion': 0
  }
};

// Câu hỏi tư vấn concept - Nhóm Chùa
export const chuaQuestions = [
  {
    id: 'chua_q1',
    question: 'Hai bạn muốn buổi lễ mang không khí',
    options: [
      { text: 'Trang nghiêm, truyền thống', score: { 'Truyền thống': 1 } },
      { text: 'Tối giản, tĩnh lặng, thiên về thiền', score: { 'Thiền': 1 } },
      { text: 'Lãng mạn nhưng vẫn linh thiêng', score: { 'Sen': 1 } }
    ]
  },
  {
    id: 'chua_q2',
    question: 'Khi nghĩ đến Lễ Hằng Thuận, điều nào khiến hai bạn thấy rung động nhất?',
    options: [
      { text: 'Sự trang nghiêm và thiêng liêng trong nghi lễ', score: { 'Truyền thống': 1 } },
      { text: 'Cảm giác tĩnh tại, nhẹ nhõm như một buổi thiền', score: { 'Thiền': 1 } },
      { text: 'Khoảnh khắc kết nối đầy cảm xúc giữa hai người', score: { 'Sen': 1 } }
    ]
  },
  {
    id: 'chua_q3',
    question: 'Nếu mô tả hai bạn bằng 1 cụm từ, đâu là điều đúng nhất?',
    options: [
      { text: 'Cổ điển & sâu sắc – thích gìn giữ giá trị truyền thống', score: { 'Truyền thống': 1 } },
      { text: 'Bình an & hướng nội – thích sự giản dị, tĩnh lặng', score: { 'Thiền': 1 } },
      { text: 'Lãng mạn & tinh tế – thích vẻ đẹp nhẹ nhàng, cảm xúc', score: { 'Sen': 1 } }
    ]
  },
  {
    id: 'chua_q4',
    question: 'Hai bạn mong muốn khách mời cảm nhận được điều gì trong buổi lễ?',
    options: [
      { text: 'Sự trang nghiêm và đạo vị của nghi lễ', score: { 'Truyền thống': 1 } },
      { text: 'Không khí an yên, tĩnh lặng – như một hành trình thiền chung', score: { 'Thiền': 1 } },
      { text: 'Niềm hạnh phúc và xúc động khi chứng kiến tình yêu được chúc phúc', score: { 'Sen': 1 } }
    ]
  }
];

// Câu hỏi tư vấn concept - Nhóm Resort
export const resortQuestions = [
  {
    id: 'resort_q1',
    question: 'Hai bạn mong buổi lễ mang không khí như thế nào?',
    options: [
      { text: 'Thiền định – tĩnh lặng, thiên nhiên', score: { 'Modern Zen': 1 } },
      { text: 'Thanh nhã, hiện đại nhưng vẫn mang chất Phật giáo', score: { 'Elegant Contemporary': 1 } },
      { text: 'Lãng mạn, nhẹ nhàng – cảm xúc kết nối', score: { 'Nature Fusion': 1 } }
    ]
  },
  {
    id: 'resort_q2',
    question: 'Khi nghĩ đến buổi lễ trong không gian thiên nhiên, hai bạn muốn cảm giác thế nào?',
    options: [
      { text: 'Tĩnh lặng, như một buổi thiền giữa thiên nhiên', score: { 'Modern Zen': 1 } },
      { text: 'Thanh nhã, nhẹ nhàng, mang hơi hướng hiện đại', score: { 'Elegant Contemporary': 1 } },
      { text: 'Lãng mạn, mềm mại và chan chứa cảm xúc', score: { 'Nature Fusion': 1 } }
    ]
  },
  {
    id: 'resort_q3',
    question: 'Hai bạn thường hướng tới phong cách sống như thế nào?',
    options: [
      { text: 'Sống chậm, tìm sự bình an trong tâm', score: { 'Modern Zen': 1 } },
      { text: 'Tối giản, tinh tế và hiện đại', score: { 'Elegant Contemporary': 1 } },
      { text: 'Yêu cái đẹp, thích cảm xúc và sự kết nối', score: { 'Nature Fusion': 1 } }
    ]
  },
  {
    id: 'resort_q4',
    question: 'Nếu chọn nhạc nền cho buổi lễ, bạn sẽ thích:',
    options: [
      { text: 'Tiếng chuông chùa và tụng kinh nhẹ nhàng', score: { 'Modern Zen': 1 } },
      { text: 'Tiếng nhạc thiền với âm thanh thiên nhiên', score: { 'Elegant Contemporary': 1 } },
      { text: 'Bản hòa tấu nhẹ, có cảm xúc lãng mạn', score: { 'Nature Fusion': 1 } }
    ]
  }
];

// Tính điểm và trả về concept phù hợp
export function calculateConceptScore(answers, locationType) {
  const scores = locationType === 'chua' 
    ? { 'Truyền thống': 0, 'Thiền': 0, 'Sen': 0 }
    : { 'Modern Zen': 0, 'Elegant Contemporary': 0, 'Nature Fusion': 0 };

  // Tính điểm từ các câu trả lời
  answers.forEach(answer => {
    if (answer.score) {
      Object.keys(answer.score).forEach(concept => {
        if (scores[concept] !== undefined) {
          scores[concept] += answer.score[concept];
        }
      });
    }
  });

  // Tìm concept có điểm cao nhất
  const maxScore = Math.max(...Object.values(scores));
  const topConcepts = Object.keys(scores).filter(concept => scores[concept] === maxScore);

  return {
    scores,
    topConcept: topConcepts[0],
    isTie: topConcepts.length > 1,
    topConcepts
  };
}

// Mô tả concept
export const conceptDescriptions = {
  'Truyền thống': {
    name: 'Truyền thống Phật giáo',
    description: 'Concept này thường dành cho các cặp đôi yêu giá trị truyền thống, muốn giữ trọn tinh thần Phật giáo cổ điển trong buổi lễ.',
    colors: 'Đỏ, vàng, nâu gỗ',
    mood: 'Trang nghiêm, thiêng liêng'
  },
  'Thiền': {
    name: 'Thiền – Tối giản',
    description: 'Concept này thường dành cho các cặp đôi yêu sự tĩnh lặng, bình an, thích không gian tối giản và thiền định.',
    colors: 'Trắng, xanh lá, nâu gỗ',
    mood: 'Tĩnh tại, an yên'
  },
  'Sen': {
    name: 'Sen – Thuần khiết',
    description: 'Concept này thường dành cho các cặp đôi yêu vẻ đẹp lãng mạn, tinh tế, muốn kết hợp cảm xúc với tinh thần Phật giáo.',
    colors: 'Hồng sen, trắng, xanh nhẹ',
    mood: 'Lãng mạn, thuần khiết'
  },
  'Modern Zen': {
    name: 'Modern Zen',
    description: 'Concept này thường dành cho các cặp đôi yêu sự bình an, sống chậm, muốn kết hợp thiền định với thiên nhiên.',
    colors: 'Xanh lá, trắng, nâu',
    mood: 'Thiền định, thiên nhiên'
  },
  'Elegant Contemporary': {
    name: 'Elegant Contemporary',
    description: 'Concept này thường dành cho các cặp đôi yêu sự tối giản, tinh tế, muốn Phật giáo đương đại và thanh nhã.',
    colors: 'Trắng, xám, vàng nhẹ',
    mood: 'Thanh nhã, hiện đại'
  },
  'Nature Fusion': {
    name: 'Nature Fusion',
    description: 'Concept này thường dành cho các cặp đôi yêu cảm xúc, kết nối, muốn lãng mạn trong không gian thiên nhiên.',
    colors: 'Hồng, xanh lá, trắng',
    mood: 'Lãng mạn, thiên nhiên'
  }
};

