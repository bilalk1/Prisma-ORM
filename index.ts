import { prisma } from './generated/prisma-client'
import datamodelInfo from './generated/nexus-prisma'
import * as path from 'path'
import { prismaObjectType, makePrismaSchema } from 'nexus-prisma'
import { GraphQLServer } from 'graphql-yoga'

const Query = prismaObjectType<any>({
  name: 'Query',
  definition(t) {
    t.prismaFields(['*'])
  }
})

const Mutation = prismaObjectType<any>({
  name: 'Mutation',
  definition(t) {
    t.prismaFields(['createUser', 'deletePost', 'createContact', 'deletePost', 'deleteUser'])
  },
})

const schema = makePrismaSchema({
  types: [Query, Mutation],

  prisma: {
    datamodelInfo,
    client: prisma,
  },

  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },
});
const server = new GraphQLServer({
  schema,
  context: { prisma },
})
server.start(() => console.log('Server is running on http://localhost:4000'))
