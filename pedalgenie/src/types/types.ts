type Product = {
    id : number;
    image : string;
    shop : string;
    name : string;
    price : string;
    chip : string[];
};
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
type ProductProps = {
    product : Product[];
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