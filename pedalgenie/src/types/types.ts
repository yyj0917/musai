type Product = {
    id : number;
    image : string;
    shop : string;
    name : string;
    price : string;
    chip : string[];
};
type ProductProps = {
    product : Product[];
};
type LikeProduct = {
    id : number;
    image : string;
    shop : string;
    name : string;
    price : string;
    chip : string[];
    like : boolean;
};
type LikeProductProps = {
    likeProduct : LikeProduct[];
};
type LikeShop = {
    id : number;
    image : string;
    shop : string;
    like : boolean;
}

type LikeShopProps = {
    likeShop : LikeShop[];
}

type Effector = {
    id : number;
    image : string;
    name : string;
    price : number;
    chip : string[];
    link : string;
}
type EffectorProps = {
    effector : Effector[];
};

type Article = {
    id : number;
    image : string;
    title : string;
    category : string[];
};
type ArticleProps = {
    article : Article[];
};

type FilterProps = {
    isOpen : boolean;
    onClose : () => void;
}

