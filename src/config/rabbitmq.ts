import amqp from 'amqplib'

let channel: amqp.Channel;

const RABBITMQ_PORT = Number(process.env.RABBITMQ_PORT) || 5672;

export const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect({
            protocol: "amqp",
            hostname: process.env.RABBITMQ_HOST,
            port: RABBITMQ_PORT,
            username: process.env.RABBITMQ_USER,
            password: process.env.RABBITMQ_PASSWORD,
        });

        channel = await connection.createChannel();
        console.log("RabbitMQ connected")
    } catch (error) {
        console.log("Failed to connect with Rabbit", error);
    }
}

export const publishToQueue = async (queueName: string, message: any) => {
    if (!channel) {
        throw new Error("Channel is not initialized");
    }

    await channel.assertQueue(queueName, { durable: true });

    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
        persistent: true,
    });
}