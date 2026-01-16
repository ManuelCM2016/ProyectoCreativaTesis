import { client } from './client';

// Advisor Queries
export const getAdvisors = async () => {
    try {
        return await client.fetch(
            `*[_type == "advisor"] | order(order asc) {
        _id,
        name,
        role,
        bio,
        "photo": photo.asset->url,
        specialties,
        slug
      }`
        );
    } catch (error) {
        console.error('Error fetching advisors:', error);
        return [];
    }
};

// Service Queries
export const getServiceBySlug = async (slug: string) => {
    try {
        return await client.fetch(
            `*[_type == "service" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        content,
        seoTitle,
        seoDescription,
        "ogImage": ogImage.asset->url
      }`,
            { slug }
        );
    } catch (error) {
        console.error('Error fetching service:', error);
        return null;
    }
};

// Blog Post Queries
export const getBlogPosts = async () => {
    try {
        return await client.fetch(
            `*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        content,
        "author": author->name,
        publishedAt,
        "mainImage": mainImage.asset->url
      }`
        );
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
};

export const getBlogPostBySlug = async (slug: string) => {
    try {
        return await client.fetch(
            `*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        content,
        "author": author->name,
        publishedAt,
        "mainImage": mainImage.asset->url,
        seoTitle,
        seoDescription,
        "ogImage": ogImage.asset->url
      }`,
            { slug }
        );
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return null;
    }
};

// Success Case Queries
export const getSuccessCases = async () => {
    try {
        return await client.fetch(
            `*[_type == "successCase"] | order(_createdAt desc) {
        _id,
        title,
        personName,
        career,
        university,
        thesisTopic,
        quote,
        "avatar": avatar.asset->url,
        slug,
        content,
        resultsBadges,
        university,
        thesisTopic
      }`
        );
    } catch (error) {
        console.error('Error fetching success cases:', error);
        return [];
    }
};

export const getSuccessCaseBySlug = async (slug: string) => {
    try {
        return await client.fetch(
            `*[_type == "successCase" && slug.current == $slug][0] {
        _id,
        title,
        personName,
        career,
        university,
        thesisTopic,
        quote,
        resultsBadges,
        "avatar": avatar.asset->url,
        content,
        slug,
        seoTitle,
        seoDescription,
        "ogImage": ogImage.asset->url
      }`,
            { slug }
        );
    } catch (error) {
        console.error('Error fetching success case:', error);
        return null;
    }
};
