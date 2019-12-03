const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const mailer = require("./nodemailer");
const MongoClient = require("mongodb").MongoClient;
let db;

let uri =
  "mongodb+srv://cudatest:0123456789cuda@cudatest-vswqk.mongodb.net/test?retryWrites=true&w=majority";

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public/"));

let header = {
  nav: [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Work", href: "#portfolio" },
    { id: "blogLink", name: "Blog", href: "#" },
    { name: "Contact", href: "#contact" }
  ],
  content:
    "Hi there! We are the new kids on the block and we build awesome websites and mobile apps."
};
let services = {
  headerTitle: "SERVICES WE PROVIDE",
  headerNote:
    "We are working with both individuals and businesses from all over the globe to create awesome websites and applications.",
  contentItems: [
    {
      imageSrc: "../src/img/services/flag.png",
      title: "Branding",
      notice:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh."
    },
    {
      imageSrc: "../src/img/services/pencil.png",
      title: "Design",
      notice: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem."
    },
    {
      imageSrc: "../src/img/services/cogwheel.png",
      title: "Development",
      notice:
        "At vero eos et accusamus et iusto odio dignissimos qui blanditiis praesentium."
    },
    {
      imageSrc: "../src/img/services/rocket.png",
      title: "ROCKET SCIENCE",
      notice:
        "Et harum quidem rerum est et expedita distinctio. Nam libero tempore."
    }
  ]
};
let team = {
  headerTitle: "MEET OUR BEAUTIFUL TEAM",
  headerNote:
    "We are a small team of designers and developers, who help brands with big ideas.",
  contentItems: [
    {
      photoSrc: "../src/img/team/anne.png",
      teammateName: "ANNE HATHAWAY",
      teammatePosition: "CEO / Marketing Guru",
      teammateDescription:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.",
      links: [
        {
          class: "fb-icon",
          href: "https://www.facebook.com/",
          iconSrc: "../src/img/team/fb_icon.png"
        },
        {
          class: "twitter-icon",
          href: "https://www.twitter.com/",
          iconSrc: "../src/img/team/twitter_icon.png"
        },
        {
          class: "linkedIn-icon",
          href: "https://www.linkedin.com/",
          iconSrc: "../src/img/team/in_icon.png"
        },
        {
          class: "mail-icon",
          href: "mailto:ochornolutskyi@gmail.com",
          iconSrc: "../src/img/team/mail_icon.png"
        }
      ]
    },
    {
      photoSrc: "../src/img/team/kate.jpeg",
      teammateName: "Kate Upton",
      teammatePosition: "Creative Director",
      teammateDescription:
        "Duis aute irure dolor in in voluptate velit esse cillum dolore fugiat nulla pariatur. Excepteur sint occaecat non diam proident.",
      links: [
        {
          class: "twitter-icon",
          href: "https://www.twitter.com/",
          iconSrc: "../src/img/team/twitter_icon.png"
        },
        {
          class: "linkedIn-icon",
          href: "https://www.linkedin.com/",
          iconSrc: "../src/img/team/in_icon.png"
        },
        {
          class: "mail-icon",
          href: "mailto:ochornolutskyi@gmail.com",
          iconSrc: "../src/img/team/mail_icon.png"
        }
      ]
    },
    {
      photoSrc: "../src/img/team/olivia.png",
      teammateName: "Olivia Wilde",
      teammatePosition: "Lead Designer",
      teammateDescription:
        "Nemo enim ipsam voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem nesciunt.",
      links: [
        {
          class: "fb-icon",
          href: "https://www.facebook.com/",
          iconSrc: "../src/img/team/fb_icon.png"
        },
        {
          class: "twitter-icon",
          href: "https://www.twitter.com/",
          iconSrc: "../src/img/team/twitter_icon.png"
        },
        {
          class: "linkedIn-icon",
          href: "https://www.linkedin.com/",
          iconSrc: "../src/img/team/in_icon.png"
        },
        {
          class: "mail-icon",
          href: "mailto:ochornolutskyi@gmail.com",
          iconSrc: "../src/img/team/mail_icon.png"
        }
      ]
    },
    {
      photoSrc: "../src/img/team/greene-ashley.png",
      teammateName: "Ashley Greene",
      teammatePosition: "SEO / Developer",
      teammateDescription:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
      links: [
        {
          class: "fb-icon",
          href: "https://www.facebook.com/",
          iconSrc: "../src/img/team/fb_icon.png"
        },
        {
          class: "twitter-icon",
          href: "https://www.twitter.com/",
          iconSrc: "../src/img/team/twitter_icon.png"
        },
        {
          class: "mail-icon",
          href: "mailto:ochornolutskyi@gmail.com",
          iconSrc: "../src/img/team/mail_icon.png"
        }
      ]
    }
  ]
};
let skills = {
  headerTitle: "WE GOT SKILLS!",
  headerNote:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  contentItems: [
    {
      itemClass: "webDesign",
      baseSrc: "../src/img/skills/base.png",
      progressSrc: "../src/img/skills/progress_web.png",
      progressPercent: "90",
      itemTitle: "Web Design"
    },
    {
      itemClass: "htmlCss",
      baseSrc: "../src/img/skills/base.png",
      progressSrc: "../src/img/skills/progress_htmlcss.png",
      progressPercent: "75",
      itemTitle: "HTML / CSS"
    },
    {
      itemClass: "graphicDesign",
      baseSrc: "../src/img/skills/base_graphic.png",
      progressSrc: "../src/img/skills/progress_design.png",
      progressPercent: "70",
      itemTitle: "GRAPHIC DESIGN"
    },
    {
      itemClass: "uiUx",
      baseSrc: "../src/img/skills/base.png",
      progressSrc: "../src/img/skills/progress_uiux.png",
      progressPercent: "85",
      itemTitle: "UI / UX"
    }
  ]
};
let portfolio = {
  headerTitle: "OUR PORTFOLIO",
  headerNote:
    "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet consectetur, adipisci velit, sed quia non numquam",
  galleryButtons: [
    { activity: true, buttonId: "buttonAll", buttonTitle: "ALL" },
    { buttonId: "buttonWeb", buttonTitle: "WEB" },
    { buttonId: "buttonApps", buttonTitle: "APPS" },
    { buttonId: "buttonIcons", buttonTitle: "Icons" }
  ],
  contentItems: [
    {
      class: "gallery-item__web",
      itemImgSrc: "../src/img/portfolio/isometric.png",
      itemTitle: "Isometric Perspective Mock-Up"
    },
    {
      class: "gallery-item__apps",
      itemImgSrc: "../src/img/portfolio/timezone.png",
      itemTitle: "Time Zone App UI"
    },
    {
      class: "gallery-item__web",
      itemImgSrc: "../src/img/portfolio/mediaplayer.png",
      itemTitle: "Viro Media Players UI"
    },
    {
      class: "gallery-item__icons",
      itemImgSrc: "../src/img/portfolio/blog.png",
      itemTitle: "Blog / Magazine Flat UI Kit"
    }
  ]
};
let about = {
  headerTitle: "WHAT POEPLE SAY ABOUT US",
  headerNote: "Our clients love us!",
  contentItems: [
    {
      aboutPhotoSrc: "../src/img/about/iman.jpg",
      aboutText:
        "Nullam dapibus blandit orci, viverra gravida dui lobortis eget. Maecenas fringilla urna eu nisl scelerisque.",
      aboutName: "Chanel Iman",
      aboutPosition: "CEO of Pinterest"
    },
    {
      aboutPhotoSrc: "../src/img/about/lima.jpg",
      aboutText:
        "Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta.",
      aboutName: "ADRIANA LIMA",
      aboutPosition: "Founder of Instagram"
    },
    {
      aboutPhotoSrc: "../src/img/about/anne.png",
      aboutText:
        "Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta.",
      aboutName: "ANNE HATHAWAY",
      aboutPosition: "Lead Designer at Behance"
    },
    {
      aboutPhotoSrc: "../src/img/about/stone.jpeg",
      aboutText:
        "Phasellus non purus vel arcu tempor commodo. Fusce semper, purus vel luctus molestie, risus sem cursus neque.",
      aboutName: "EMMA STONE",
      aboutPosition: "Co-Founder of Shazam"
    },
    {
      aboutPhotoSrc: "../src/img/about/photo.png",
      aboutText:
        "Nullam dapibus blandit orci, viverra gravida dui lobortis eget. Maecenas fringilla urna eu nisl scelerisque.",
      aboutName: "name1",
      aboutPosition: "Position"
    },
    {
      aboutPhotoSrc: "../src/img/about/photo.png",
      aboutText:
        "Nullam dapibus blandit orci, viverra gravida dui lobortis eget. Maecenas fringilla urna eu nisl scelerisque.",
      aboutName: "name2",
      aboutPosition: "Position"
    },
    {
      aboutPhotoSrc: "../src/img/about/photo.png",
      aboutText:
        "Nullam dapibus blandit orci, viverra gravida dui lobortis eget. Maecenas fringilla urna eu nisl scelerisque.",
      aboutName: "name3",
      aboutPosition: "Position"
    },
    {
      aboutPhotoSrc: "../src/img/about/photo.png",
      aboutText:
        "Nullam dapibus blandit orci, viverra gravida dui lobortis eget. Maecenas fringilla urna eu nisl scelerisque.",
      aboutName: "name4",
      aboutPosition: "Position"
    }
  ]
};

let enterName, enterEmail, enterMessage;

app.get("/", function(req, res) {
  res.render("index", {
    header,
    services,
    team,
    skills,
    portfolio,
    about
  });
});

app.post("/", function(req, res) {
  if (!req.body.username && req.body.email && req.body.text)
    return res.render("contact", {
      enterName: "Please enter your name",
      enterEmail,
      enterMessage
    });
  if (!req.body.username && !req.body.email && req.body.text)
    return res.render("contact", {
      enterName: "Please enter your name" + " | ",
      enterEmail: "Please enter correct email",
      enterMessage
    });
  if (!req.body.username && !req.body.email && req.body.text.length < 10)
    return res.render("contact", {
      enterName: "Please enter your name" + " | ",
      enterEmail: "Please enter correct email" + " | ",
      enterMessage: "Your message must be more than 10 characters"
    });
  if (req.body.username && !req.body.email && req.body.text.length < 10)
    return res.render("contact", {
      enterName,
      enterEmail: " | " + "Please enter correct email",
      enterMessage: "Your message must be more than 10 characters"
    });
  if (req.body.username && !req.body.email && req.body.text)
    return res.render("contact", {
      enterName,
      enterEmail: " | " + "Please enter correct email",
      enterMessage
    });
  if (req.body.username && req.body.email && req.body.text.length < 10)
    return res.render("contact", {
      enterName,
      enterEmail,
      enterMessage: " | " + "Your message must be more than 10 characters"
    });
  const mailMessage = {
    from: "cuda.test@ukr.net",
    to: "cuda.test@ukr.net",
    subject: "cuda send message",
    text:
      "Name: " +
      req.body.username +
      "\n" +
      "Email: " +
      req.body.email +
      "\n" +
      "Message: " +
      req.body.text
  };
  mailer(mailMessage);
  res.render("index", {
    header,
    services,
    team,
    skills,
    portfolio,
    about
  });
});

MongoClient.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(err, database) {
    if (err) {
      return console.log(err);
    }
    db = database;
    app.listen(port, function() {
      console.log("server starting on 3000 port");
    });
  }
);
