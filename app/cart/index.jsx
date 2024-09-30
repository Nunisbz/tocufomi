import React, { useState, useContext, useEffect } from 'react';
import { AppDataContext } from "../scripts/AppDataContext";
import { View, Text, Pressable, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import PageHeader from "../components/PageHeader";

const CartItem = ({ id, title, seller, cost }) => {
    return (
        <View style={styles.cartItem}>
            <View>
                <Text style={styles.itemTitle}>{title}</Text>
                <Text style={styles.itemSeller}>{seller}</Text>
            </View>
            <View>
                <Text style={styles.itemPrice}>R$ {cost}</Text>
            </View>
        </View>
    );
};

const CartScreen = () => {
    const { shoppingCart, updateCart } = useContext(AppDataContext);
    const [totalAmount, setTotalAmount] = useState(0);

    const removeFromCart = (index) => {
        const updatedCart = [...shoppingCart];
        updatedCart.splice(index, 1);
        updateCart(updatedCart);
    };

    useEffect(() => {
        const calculateTotal = shoppingCart.reduce((acc, item) => acc + item.cost, 0);
        setTotalAmount(calculateTotal.toFixed(2));
    }, [shoppingCart]);

    return (
        <SafeAreaView style={styles.screen}>
            <PageHeader navigationLink=".." pageTitle="Carrinho de Compras" />
            <FlatList
                data={shoppingCart}
                renderItem={({ item, index }) => (
                    <View style={styles.cartItemContainer}>
                        <CartItem title={item.title} seller={item.seller} cost={item.cost} id={item.id} />
                        <Pressable onPress={() => removeFromCart(index)} style={styles.removeButton}>
                            <Text style={styles.removeText}>Excluir</Text>
                        </Pressable>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.footer}>
                <Text style={styles.totalText}>Total: R$ {totalAmount}</Text>
                <View style={styles.actionButtons}>
                    <Pressable onPress={() => updateCart([])} style={styles.button}>
                        <Text style={styles.buttonText}>Esvaziar</Text>
                    </Pressable>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Finalizar Compra</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
    },
    cartItemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 15,
        borderBottomWidth: 1,
        borderColor: "gray",
        paddingBottom: 10,
    },
    removeButton: {
        justifyContent: "center",
    },
    removeText: {
        color: "red",
        fontWeight: "bold",
    },
    footer: {
        marginTop: 20,
        alignItems: "center",
    },
    totalText: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 15,
    },
    actionButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%',
    },
    button: {
        backgroundColor: '#1E90FF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '45%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    }
});

export default CartScreen;
