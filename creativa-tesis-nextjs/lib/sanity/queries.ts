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
        yearsOfExperience,
        corporateEmail,
        socialMedia,
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

// Video Queries
export const getVideos = async () => {
    try {
        return await client.fetch(
            `*[_type == "video"] | order(order asc, _createdAt desc) {
        _id,
        title,
        description,
        platform,
        videoUrl,
        aspectRatio,
        orientation,
        "thumbnail": thumbnail.asset->url,
        featured
      }`
        );
    } catch (error) {
        console.error('Error fetching videos:', error);
        return [];
    }
};

export const getFeaturedVideos = async () => {
    try {
        return await client.fetch(
            `*[_type == "video" && featured == true] | order(order asc) {
        _id,
        title,
        description,
        platform,
        videoUrl,
        aspectRatio,
        orientation,
        "thumbnail": thumbnail.asset->url
      }`
        );
    } catch (error) {
        console.error('Error fetching featured videos:', error);
        return [];
    }
};

// Home Page Queries
export const getHomeIntro = async () => {
    try {
        return await client.fetch(
            `*[_type == "homeIntro"][0] {
        eyebrow,
        headlineRaw,
        headlineHighlight,
        headlineEnd,
        paragraph1,
        paragraph2,
        ctaText,
        ctaLink,
        mediaType,
        "imageUrl": image.asset->url,
        video {
            platform,
            url,
            aspectRatio,
            "thumbnail": thumbnail.asset->url
        }
      }`
        );
    } catch (error) {
        console.error('Error fetching home intro:', error);
        return null;
    }
};

// Chat Testimonial Queries (WhatsApp Screenshots)
export const getChatTestimonials = async () => {
    try {
        return await client.fetch(
            `*[_type == "chatTestimonial"] | order(order asc, _createdAt desc) {
        _id,
        studentName,
        universityInfo,
        highlightText,
        emojiBadge,
        "chatScreenshot": chatScreenshot.asset->url
      }`
        );
    } catch (error) {
        console.error('Error fetching chat testimonials:', error);
        return [];
    }
};

// Certification / Institution Queries
export const getCertifications = async () => {
    try {
        return await client.fetch(
            `*[_type == "certification"] | order(order asc, _createdAt desc) {
        _id,
        name,
        fullName,
        "logo": logo.asset->url,
        category,
        url
      }`
        );
    } catch (error) {
        console.error('Error fetching certifications:', error);
        return [];
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// Social Flyer Queries — Vitrina de Redes Sociales
// ─────────────────────────────────────────────────────────────────────────────

/** Todos los flyers activos — galería completa de Blog y Recursos */
export const getSocialFlyers = async () => {
    try {
        return await client.fetch(
            `*[_type == "socialFlyer" && active == true] | order(order asc, publishedAt desc) {
        _id,
        title,
        caption,
        category,
        tags,
        featured,
        publishedAt,
        linkUrl,
        "imageUrl": image.asset->url,
        "imageDimensions": image.asset->metadata.dimensions
      }`
        );
    } catch (error) {
        console.error('Error fetching social flyers:', error);
        return [];
    }
};

/** Solo flyers destacados — preview en Inicio (máx 10) */
export const getFeaturedFlyers = async () => {
    try {
        return await client.fetch(
            `*[_type == "socialFlyer" && active == true && featured == true] | order(order asc, publishedAt desc) [0...10] {
        _id,
        title,
        caption,
        category,
        linkUrl,
        "imageUrl": image.asset->url,
        "imageDimensions": image.asset->metadata.dimensions
      }`
        );
    } catch (error) {
        console.error('Error fetching featured flyers:', error);
        return [];
    }
};
