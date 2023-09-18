import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               2

import {
  text,
  relationship,
  password,
  timestamp,
  select,
  image,
  file,
} from '@keystone-6/core/fields';

// the document field is a more complicated field, so it has it's own package
import { document } from '@keystone-6/fields-document';
// if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields

// when using Typescript, you can refine your types to a stricter subset by importing
// the generated types from '.keystone/types'
import type { Lists } from '.keystone/types';
import { graphql } from '@graphql-ts/schema';

export const lists: Lists = {
  User: list({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: allowAll,

    // this is the fields for our User list
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),
      password: password({ validation: { isRequired: true } }),
      posts: relationship({ ref: 'Post.author', many: true }),
      contractPermissions: relationship({ref: 'Contract.permissions', many: true}),
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
      stripe: text({ validation: { isRequired: true } }),
      auth0id: text({ validation: { isRequired: true } }),
      role: text({ validation: { isRequired: true } }),
    },
  }),

  Contract: list({
    access: allowAll,
    fields: {
    createdAt: timestamp({
        defaultValue: { kind: 'now' },
    }),
    permissions: relationship({
      ref: 'User.contractPermissions',
      many: true,
    }),
    shipper: relationship({
      ref: 'User',
      many: false,
    }),
    file: file({ storage: 'bucket' }),
    consignee: text({ validation: { isRequired: true } }),
    images: relationship({
      ref: 'Photo'
    })
    
    }
  }),
  Photo: list({
    access: allowAll,
    fields: {
      contract: relationship({
        ref: 'Contract'
      }),
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
      image: image({ storage: 'bucket' }),
    }
  }),

  Post: list({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      content: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),
      

      // with this field, you can set a User as the author for a Post
      author: relationship({
        // we could have used 'User', but then the relationship would only be 1-way
        ref: 'User.posts',
        // a Post can only have one author
        //   this is the default, but we show it here for verbosity
        many: false,
      }),

      // with this field, you can add some Tags to Posts
      tags: relationship({
        ref: 'Tag.posts',
        many: true,
      }),
      
    },
  }),

  Tag: list({
    access: allowAll,
    ui: {
      isHidden: true,
    },

    // this is the fields for our Tag list
    fields: {
      name: text(),
      // this can be helpful to find out all the Posts associated with a Tag
      posts: relationship({ ref: 'Post.tags', many: true }),
    },
  }),

  // export const extendGraphqlSchema = (schema: GraphQLSchema): GraphQLSchema => {
  //   return graphql.extend((base) => {
  //     return {
  //       mutation: {

  //       },
  //       query: {

  //       }
  //     }
  //   })
  // }
};

  export const extendGraphqlSchema = (schema: GraphQLSchema): GraphQLSchema => {
    return graphql.extend((base) => {
      return {
        mutation: {

        },
        query: {

        }
      }
    })
  }