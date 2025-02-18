import axios from "axios"

const processRecord = async (record) => {
  try {
    const reqsubject = `Truenas ${record.Sns.Subject}`
    console.log("subject" + reqsubject)
    const reqMessage = record.Sns.Message
    console.log("message" + reqMessage)
    const response = await axios.post('https://simplepu.sh', {"key": process.env.SIMPLEPUSH_KEY, "title": reqsubject, "msg": reqMessage})
    console.log(`Processed Record:`, response.data);
    return response.data;
  } catch (error) {
    console.log("errors" + error)
    console.error(`Error processing record`);
    return error
  }
};

export const handler = async (event) => {
  // TODO implement
  var response
  const processRecords = async () => {
    try {
      console.log('Processing Records:', event.Records.length);
      const results = await Promise.all(event.Records.map(record => processRecord(record)))

      console.log('All records processed:' + results);
      response = {
        statusCode: 200,
        body: JSON.stringify("All records processed"),
      };

    } catch (error) {
      console.error('Error processing records:', error);
      response = {
        statusCode: 500,
        body: JSON.stringify("Error"),
      };
    }
  };
  
  await processRecords();
  return response;

};
