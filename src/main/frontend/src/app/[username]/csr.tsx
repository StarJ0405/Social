"use client";
import axios from "axios";
import { useState,useEffect } from 'react';
import { redirect } from 'next/navigation';
import { fetchUser } from '@/app/api/UserAPI';
import Image from "next/image";

