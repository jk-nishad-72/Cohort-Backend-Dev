

// Import the Pinecone library
const { Pinecone } = require('@pinecone-database/pinecone')

// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey:process.env.YOUR_API_KEY });

// Create a dense index with integrated embedding


const d34cohortchtIndex = pc.Index('cohort-chat-bot')

async function createMemory({vector, metadata , messageId}) {

      await d34cohortchtIndex.upsert([
        {
            id:messageId,
            values:vector,
            metadata
        }
      ])
    
}

async function queryMemory({queryVector,limit = 5,metadata}) {

    const data = await d34cohortchtIndex.query({
        vector:queryVector,
        topK:limit,
        filter:metadata?metadata:undefined,
        includeMetadata:true
    })

    return data.matches
    
}
module.exports = {
    createMemory,
    queryMemory,
}
