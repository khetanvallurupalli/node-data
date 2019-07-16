module.exports = () => {

    let env = process.env.NODE_ENV || 'dev'

    if (env === 'dev') {
        return {
            PORT: 3006,
            secretCredentials: {
                region: "us-east-1",
                secretName: "database"
            },
            dynamoDetails: {
                region: 'us-east-1',
                time: 3600,
                iam: "arn:aws:iam::515743939169:role/LiquidApp-FullAccess",
                sessionName: "Testuser",
            }
        }
    }

    if (env === 'aws_dev') {
        return {
            PORT: 3006,
            secretCredentials: {
                region: "us-east-1",
                secretName: "database"
            },
            dynamoDetails: {
                region: 'us-east-1',
                time: 3600,
                iam: "arn:aws:iam::515743939169:role/LiquidApp-FullAccess",
                sessionName: "Testuser",
            }
        }
    }

    if (env === 'aws_stage') {
        return {
            PORT: 3006,
            secretCredentials: {
                region: "us-east-1",
                secretName: "databaseStage"
            },
            dynamoDetails: {
                region: 'us-east-1',
                time: 3600,
                iam: "arn:aws:iam::954506432845:role/DynamoDB-LiquidApp-FullAccess",
                sessionName: "Testuser",
            }
        }
    }

    if (env === 'aws_demo') {
        return {
            PORT: 3006,
            secretCredentials: {
                region: "us-east-1",
                secretName: "databaseDemo"
            }
        }
    }

    if (env === 'aws_prod') {
        return {
            PORT: 3006,
            secretCredentials: {
                region: "us-east-1",
                secretName: "database"
            },
            dynamoDetails: {
                region: 'us-east-1',
                time: 3600,
                iam: "arn:aws:iam::058924206222:role/DynamoDB-LiquidApp-FullAccess",
                sessionName: "Testuser",
            }
        }
    }
}
