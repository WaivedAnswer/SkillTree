import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import LessonList from './LessonList';
import SignIn from './SignIn';
import AppBar from './AppBar';

const styles = StyleSheet.create({ container: {
    flexGrow: 1,
    flexShrink: 1,
    }, });
    const Main = () => { return (
    <View style={styles.container}>
    <AppBar/>
    <Routes>
        <Route path="/" element={<LessonList />} exact /> 
        <Route path="/sign-in" element={<SignIn />} exact /> 
        <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
    </View> );
    };
    export default Main;