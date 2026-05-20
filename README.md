# Personal Debt Tracker Discord Bot

A Discord bot built with Node.js, Discord.js, MongoDB, and Mongoose that helps you track money borrowed and lent inside your friend circle.

The bot allows users to:

* Add debt records
* Track who owes money
* View balances
* Autocomplete friend names
* Store data permanently using MongoDB
* Keep each user’s records separated

⸻

Features

Core Features

* Add borrowing/lending records
* Store transaction descriptions
* Track amount and person name
* View all records
* Check total balance
* Delete records
* MongoDB database integration
* Discord slash command support
* Autocomplete for friend names
* User-specific data separation

⸻

Tech Stack

Technology	Purpose
Node.js	Backend runtime
Discord.js	Discord bot framework
MongoDB	Database
Mongoose	MongoDB ODM
dotenv	Environment variable management

⸻

Project Structure
```
project/
│
├── components/
│   └── check.js
│
├── database/
│   ├── read.js
│   ├── write.js
│   └── schema/
│       └── person.js
│
├── commands/
│   └── track.js
│
├── events/
│   └── interactionCreate.js
│
├── index.js
├── deploy-commands.js
├── .env
├── package.json
└── README.md
```
⸻

Data Storage

The bot stores:

* Friend names
* Borrowed amounts
* Transaction descriptions
* User-specific records

MongoDB is used to permanently save all data.

⸻

How It Works

1. User Runs Slash Command

Example:

/track name:John amount:500 description:Dinner

⸻

2. Bot Receives Interaction

The interaction event listener captures the slash command.

client.on('interactionCreate', interaction => {
})

⸻

3. Data Validation

The bot checks:

* If fields are empty
* If amount is valid
* If the user exists

⸻

4. Data Saved to MongoDB

Using Mongoose:

await People.create({
  name,
  amount,
  desc,
  user
})

⸻

5. Records Retrieved

The bot can fetch records using:

await People.find({ user: interaction.user.username })

This ensures every user only sees their own records.

⸻

Autocomplete System

The bot supports Discord autocomplete.

When the user types:

/check Jo

The bot:

1. Reads the focused text
2. Searches MongoDB using regex
3. Returns matching names

Example:

const people = await People.find({
  userId: interaction.user.id,
  name: {
    $regex: focused,
    $options: 'i'
  }
})

⸻

Installation

1. Clone Repository

git clone [https://github.com//debt-tracker-bot.git](https://github.com/supriyobaruab/ClearLedger-Discord-Bot)

⸻

2. Install Dependencies

npm install

⸻

3. Setup Environment Variables

Create a .env file:

TOKEN=YOUR_DISCORD_BOT_TOKEN
CLIENT_ID=YOUR_CLIENT_ID
MONGO_URI=YOUR_MONGODB_URI

⸻

4. Deploy Slash Commands

node deploy-commands.js

⸻

5. Start Bot

node index.js

⸻

Example Commands

Add Record

/track name:John amount:100 desc:Food

Check Records

/check

Check Specific Person
/check person's name

⸻

Contributing

Pull requests are welcome.
For major changes, please open an issue first to discuss what you would like to change.

⸻

Screenshots

<img width="725" height="211" alt="image" src="https://github.com/user-attachments/assets/ffcc9379-feae-418e-b679-851ce47f6563" />

<img width="783" height="445" alt="image" src="https://github.com/user-attachments/assets/1ed48bdd-1162-46aa-bac8-017c35bab24e" />

<img width="728" height="578" alt="image" src="https://github.com/user-attachments/assets/832ac3c1-1434-4593-84c2-cf7f93860e8e" />



Database Preview
<img width="1083" height="504" alt="image" src="https://github.com/user-attachments/assets/ff08c4ba-e8ed-45fd-9d3e-6316608799c2" />


⸻

License

This project is open-source and free to use.

⸻

Author

Developed by Supriyo Barua Shaown.
